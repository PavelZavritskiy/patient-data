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
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Имя ребёнка',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Показатели',
    key: 'tags',
    dataIndex: 'tags',
    filters: [
      {
        text: 'Nice',
        value: 'nice',
      },
      {
        text: 'Developer',
        value: 'developer',
      },
      {
        text: 'Loser',
        value: 'loser',
      },
    ],
    onFilter: (value, record) => record.tags.includes(value as string), // Фильтрация по значению
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let icon = null;
          switch (tag) {
            case 'nice':
              icon = <HighTemp className='icon'/>;
              break;
            case 'developer':
              icon = <LowTemp className='icon'/>;
              break;
            case 'loser':
              icon = <Diarrhea className='icon'/>;
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
  {
    title: 'Дата',
    dataIndex: 'address',
    key: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer', 'nice', 'developer', 'loser', 'loser', 'loser',],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
    {
    key: '4',
    name: 'Greg Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '5',
    name: 'Ron Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '6',
    name: 'Tomi Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
    {
    key: '7',
    name: 'Adolf Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer', 'loser'],
  },
  {
    key: '8',
    name: 'Jon Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '9',
    name: 'Peter Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }
]


function MetricPage(): JSX.Element {
  return (
    <ConfigProvider locale={ruRU}>
      <div className="MetricContainer">
        <form className="Form">
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
        />
      </div>
    </ConfigProvider>
  );
}

export default MetricPage;