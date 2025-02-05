/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './MetricPage.css';
import { DatePicker, Select, ConfigProvider, Button, Table } from 'antd';
import type { SelectProps, TableProps } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import 'dayjs/locale/ru';
import { ReactComponent as HighTemp } from '../../assets/Icon/highTemp.svg';
import { ReactComponent as LowTemp } from '../../assets/Icon/lowTemp.svg';
import { ReactComponent as Diarrhea } from '../../assets/Icon/diarrhea.svg';
import { ReactComponent as Nausea } from '../../assets/Icon/nausea.svg';

enum MetricTags {
  HighTemp = 'highTemp',
  LowTemp = 'lowTemp',
  Diarrhea = 'diarrhea',
  Nausea = 'nausea',
}

const metrics = [
  'Высокая температура',
  'Низкая температура',
  'Кашель',
  'Колики',
  'Понос',
  'Зуд',
];

const metricOptions: SelectProps['options'] = metrics.map((metric) => ({
  value: metric,
  label: metric,
}));

interface DataType {
  key: string;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Дата',
    dataIndex: 'address',
    key: 'address',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Показатели',
    key: 'tags',
    dataIndex: 'tags',
    filters: [
      {
        text: 'Высокая температура',
        value: 'highTemp',
      },
      {
        text: 'Низкая температура',
        value: 'lowTemp',
      },
      {
        text: 'Тошнота',
        value: 'nausea',
      },
      {
        text: 'Диарея',
        value: 'diarrhea',
      },
    ],
    onFilter: (value, record) => record.tags.includes(value as string), // Фильтрация по значению
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let icon = null;
          switch (tag) {
            case 'highTemp':
              icon = <HighTemp className='icon'/>;
              break;
            case 'lowTemp':
              icon = <LowTemp className='icon'/>;
              break;
            case 'diarrhea':
              icon = <Diarrhea className='icon'/>;
              break;
            case 'nausea':
              icon = <Nausea className='icon'/>;
              break;
            default:
              icon = null;
          }
          return (
            <span key={tag} style={{ marginRight: '8px' }}>
              {icon}
            </span>
          );
        }
        )}
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    address: '2025-02-01',
    tags: [MetricTags.HighTemp, MetricTags.LowTemp, MetricTags.HighTemp, MetricTags.LowTemp, MetricTags.Diarrhea],
  },
  {
    key: '2',
    address: '2025-02-02',
    tags: [MetricTags.Diarrhea],
  },
  {
    key: '3',
    address: '2025-02-03',
    tags: [MetricTags.LowTemp, MetricTags.HighTemp],
  },
    {
    key: '4',
    address: '2025-02-04',
    tags: [MetricTags.LowTemp, MetricTags.Diarrhea],
  },
  {
    key: '5',
    address: '2025-02-05',
    tags: [MetricTags.Diarrhea, MetricTags.Nausea],
  },
  {
    key: '6',
    address: '2025-02-06',
    tags: [MetricTags.HighTemp, MetricTags.LowTemp],
  },
    {
    key: '7',
    address: '2025-02-07',
    tags: [MetricTags.Diarrhea, MetricTags.Diarrhea, MetricTags.HighTemp],
  },
  {
    key: '8',
    address: '2025-02-08',
    tags: [MetricTags.HighTemp, MetricTags.Nausea],
  },
  {
    key: '9',
    address: '2025-02-09',
    tags: [MetricTags.HighTemp, MetricTags.Diarrhea, ],
  },
  {
    key: '10',
    address: '2025-02-10',
    tags: [MetricTags.HighTemp, MetricTags.Diarrhea],
  },
]


function MetricPage(): JSX.Element {

  return (
    <ConfigProvider locale={ruRU}>
      <div className="MetricContainer">
        <form className="FormMetric">
          <DatePicker />
          <DatePicker />
          <Select
            mode="multiple"
            placeholder="Показатели:"
            options={metricOptions}
            maxTagCount={1}
            maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}`}
            style={{ width: '245px' }}
          />
          <Button className="Button" type="primary">
            Показать
          </Button>
        </form>
        <Table<DataType> 
          bordered={true}
          columns={columns} 
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </ConfigProvider>
  );
}

export default MetricPage;