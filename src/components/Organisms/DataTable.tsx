'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Table, Input, Form, Space, Button, TableProps } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { SearchOutlined, ClearOutlined } from '@ant-design/icons'
import { useDebounce } from '@/hooks/useDebounce'
import { QueryParams, PageResponse } from '@/services/types'
import { ColumnType, FilterValue, SorterResult } from 'antd/es/table/interface'

export interface CustomColumnType<T> extends ColumnType<T> {
  searchable?: boolean
}

export interface DataTableProps<T> extends TableProps<T> {
  fetchDataFn: (params: QueryParams) => Promise<PageResponse<T>>
  columns: CustomColumnType<T>[]
  initialQueryParams?: QueryParams
  queryKey: string | string[]
  rowKey?: keyof T
  showResetAll?: boolean
}

const DataTable = <T extends object>({
  fetchDataFn,
  columns: initialColumns,
  initialQueryParams = { page: 0, size: 10 },
  queryKey,
  rowKey = 'id' as keyof T,
  showResetAll = false,
  ...tableProps
}: DataTableProps<T>) => {
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQueryParams)

  const { page, size, sort, ...filters } = queryParams

  const { control, reset, watch } = useForm<Record<string, string | undefined>>({
    defaultValues: filters as Record<string, string | undefined>
  })

  const watchedFilters = watch()
  const debouncedFilters = useDebounce(watchedFilters, 500)

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      ...debouncedFilters,
      page: 0
    }))
  }, [debouncedFilters])

  const { data, isLoading, isFetching } = useQuery<PageResponse<T>>({
    queryKey: [queryKey, queryParams],
    queryFn: () => fetchDataFn(queryParams)
  })

  const handleTableChange = (
    pagination: { current?: number; pageSize?: number },
    _tableFilters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    let newSort: string | undefined = undefined
    if (!Array.isArray(sorter) && sorter.field && sorter.order) {
      if (typeof sorter.field === 'string') {
        newSort = `${sorter.field},${sorter.order === 'ascend' ? 'asc' : 'desc'}`
      } else if (Array.isArray(sorter.field)) {
        // trường hợp dataIndex là mảng, lấy phần tử cuối cùng
        newSort = `${String(sorter.field.slice(-1)[0])},${sorter.order === 'ascend' ? 'asc' : 'desc'}`
      }
    }

    setQueryParams((prev) => ({
      ...prev,
      page: pagination.current ? pagination.current - 1 : 0,
      size: pagination.pageSize || 10,
      sort: newSort
    }))
  }

  const handleResetFilters = useCallback(() => {
    reset({})
    setQueryParams(initialQueryParams)
  }, [reset, initialQueryParams])

  const getColumnSearchProps = useCallback(
    (dataIndex: ColumnType<T>['dataIndex']): ColumnType<T> => {
      const dataIndexString = Array.isArray(dataIndex) ? dataIndex.join('.') : String(dataIndex)

      return {
        filterDropdown: ({ setSelectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Form>
              <Controller
                name={dataIndexString}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={`Search ${dataIndexString}`}
                    style={{ marginBottom: 8, display: 'block' }}
                  />
                )}
              />
            </Form>
            <Space>
              <Button
                onClick={() => {
                  setSelectedKeys([])
                  reset({ ...watch(), [dataIndexString]: undefined })
                }}
                size='small'
                style={{ width: 90 }}
                icon={<ClearOutlined />}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: () => true
      }
    },
    [control, reset, watch]
  )

  const columns = useMemo(() => {
    return initialColumns.map((col) => {
      if (col.searchable && col.dataIndex !== undefined && typeof col.dataIndex !== 'symbol') {
        return {
          ...col,
          ...getColumnSearchProps(col.dataIndex)
        }
      }
      return col
    })
  }, [initialColumns, getColumnSearchProps])

  const tableDataSource = data?.data.content || []
  const totalElements = data?.data.totalElements || 0
  const currentPage = (data?.data.number || 0) + 1

  return (
    <>
      {showResetAll && (
        <Button onClick={handleResetFilters} style={{ marginBottom: 16 }}>
          Reset All Filters & Sort
        </Button>
      )}
      <Table<T>
        columns={columns}
        dataSource={tableDataSource}
        loading={isLoading || isFetching}
        pagination={{
          current: currentPage,
          pageSize: size,
          total: totalElements,
          showSizeChanger: totalElements > 10,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        onChange={handleTableChange}
        rowKey={rowKey as string}
        scroll={{ x: 'max-content' }}
        {...tableProps}
      />
    </>
  )
}

export default DataTable
