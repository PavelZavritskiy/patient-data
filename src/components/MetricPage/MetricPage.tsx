/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './MetricPage.css';
import { DatePicker, Select, ConfigProvider, Button, Table, Modal, Typography } from 'antd';
import type { SelectProps, TableProps } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import 'dayjs/locale/ru';
import { Dayjs } from 'dayjs';
import { ReactComponent as HighTemp } from '../../assets/Icon/highTemp.svg';
import { ReactComponent as LowTemp } from '../../assets/Icon/lowTemp.svg';
import { ReactComponent as Diarrhea } from '../../assets/Icon/diarrhea.svg';
import { ReactComponent as Nausea } from '../../assets/Icon/nausea.svg';

enum MetricTags {
  HighTemp = 'Высокая температура',
  LowTemp = 'Низкая температура',
  Diarrhea = 'Диарея',
  Nausea = 'Тошнота',
}

const metrics = [
  'Высокая температура',
  'Низкая температура',
  'Диарея',
  'Тошнота',
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

const data: DataType[] = [
  { key: '1', address: '2025-02-01', tags: [MetricTags.HighTemp, MetricTags.HighTemp, MetricTags.HighTemp, MetricTags.LowTemp, MetricTags.Diarrhea] },
  { key: '2', address: '2025-02-02', tags: [MetricTags.Diarrhea] },
  { key: '3', address: '2025-02-03', tags: [MetricTags.LowTemp, MetricTags.HighTemp] },
  { key: '4', address: '2025-02-04', tags: [MetricTags.LowTemp, MetricTags.Diarrhea] },
  { key: '5', address: '2025-02-05', tags: [MetricTags.Diarrhea, MetricTags.Nausea] },
  { key: '6', address: '2025-02-06', tags: [MetricTags.HighTemp, MetricTags.LowTemp] },
  { key: '7', address: '2025-02-07', tags: [MetricTags.Diarrhea, MetricTags.HighTemp] },
  { key: '8', address: '2025-02-08', tags: [MetricTags.HighTemp, MetricTags.Nausea] },
  { key: '9', address: '2025-02-09', tags: [MetricTags.HighTemp, MetricTags.Diarrhea] },
  { key: '10', address: '2025-02-10', tags: [MetricTags.HighTemp, MetricTags.Diarrhea] },
  { key: '11', address: '2025-02-11', tags: [MetricTags.HighTemp, MetricTags.HighTemp, MetricTags.HighTemp, MetricTags.LowTemp, MetricTags.Diarrhea] },
  { key: '12', address: '2025-02-12', tags: [MetricTags.Diarrhea] },
  { key: '13', address: '2025-02-13', tags: [MetricTags.LowTemp, MetricTags.HighTemp] },
  { key: '14', address: '2025-02-14', tags: [MetricTags.LowTemp, MetricTags.Diarrhea] },
  { key: '15', address: '2025-02-15', tags: [MetricTags.Diarrhea, MetricTags.Nausea] },
  { key: '16', address: '2025-02-16', tags: [MetricTags.HighTemp, MetricTags.LowTemp] },
  { key: '17', address: '2025-02-17', tags: [MetricTags.Diarrhea, MetricTags.HighTemp] },
  { key: '18', address: '2025-02-18', tags: [MetricTags.HighTemp, MetricTags.Nausea] },
  { key: '19', address: '2025-02-19', tags: [MetricTags.HighTemp, MetricTags.Diarrhea] },
  { key: '20', address: '2025-02-20', tags: [MetricTags.HighTemp, MetricTags.Diarrhea] },
  { key: '21', address: '2025-02-21', tags: [MetricTags.HighTemp, MetricTags.HighTemp, MetricTags.HighTemp, MetricTags.LowTemp, MetricTags.Diarrhea] },
  { key: '22', address: '2025-02-22', tags: [MetricTags.Diarrhea] },
  { key: '23', address: '2025-02-23', tags: [MetricTags.LowTemp, MetricTags.HighTemp] },
  { key: '24', address: '2025-02-24', tags: [MetricTags.LowTemp, MetricTags.Diarrhea] },
  { key: '25', address: '2025-02-25', tags: [MetricTags.Diarrhea, MetricTags.Nausea] },
  { key: '26', address: '2025-02-26', tags: [MetricTags.HighTemp, MetricTags.LowTemp] },
  { key: '27', address: '2025-02-27', tags: [MetricTags.Diarrhea, MetricTags.HighTemp] },
  { key: '28', address: '2025-02-28', tags: [MetricTags.HighTemp, MetricTags.Nausea] },
];

function MetricPage(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showModal = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleStartDateChange: (date: Dayjs | null, dateString: string | string[]) => void = (date, dateString) => {
    setStartDate(Array.isArray(dateString) ? dateString[0] : dateString);
  };

  const handleEndDateChange: (date: Dayjs | null, dateString: string | string[]) => void = (date, dateString) => {
    setEndDate(Array.isArray(dateString) ? dateString[0] : dateString);
  };

  const handleMetricsChange = (value: string[]) => {
    setSelectedMetrics(value);
  };

  const handleFilterData = () => {
    if (!startDate && !endDate) {
      setErrorMessage('Выберите интересующие вас даты!');
      setFilteredData([]);
      return;
    }

  setErrorMessage(null);

  const newFilteredData = data.filter((item) => {
    const dateInRange =
      (!startDate || item.address >= startDate) &&
      (!endDate || item.address <= endDate);

      const matchesMetrics =
        selectedMetrics.length === 0 ||
        selectedMetrics.some((metric) => item.tags.includes(metric));

      return dateInRange && matchesMetrics;
    });

    setFilteredData(newFilteredData);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Дата',
      dataIndex: 'address',
      key: 'key',
      render: (text) => (
        <a onClick={() => showModal(text)}>{text}</a>
      ),
    },
    {
      title: 'Показатели',
      key: 'key',
      dataIndex: 'tags',
      filters: [
        {
          text: 'Высокая температура',
          value: 'Высокая температура',
        },
        {
          text: 'Низкая температура',
          value: 'Низкая температура',
        },
        {
          text: 'Тошнота',
          value: 'Тошнота',
        },
        {
          text: 'Диарея',
          value: 'Диарея',
        },
      ],
      onFilter: (value, record) => record.tags.includes(value as string),
  render: (_, { tags }) => (
    <div className="icon-container">
      {tags.map((tag, index) => {
        let icon = null;
        switch (tag) {
          case 'Высокая температура':
            icon = <HighTemp className='icon' />;
            break;
          case 'Низкая температура':
            icon = <LowTemp className='icon' />;
            break;
          case 'Диарея':
            icon = <Diarrhea className='icon' />;
            break;
          case 'Тошнота':
            icon = <Nausea className='icon' />;
            break;
          default:
            icon = null;
        }
        return (
          <span key={`${tag}-${index}`}>
            {icon}
          </span>
        );
      })}
    </div>
      ),
    },
  ];

  const modalTags = data.find((item) => item.address === selectedDate);

  return (
    <ConfigProvider locale={ruRU}>
      <div className="metricContainer">
        <form className="formMetric">
          <DatePicker
            onChange={handleStartDateChange}
            placeholder="Начальная дата"
          />
          <DatePicker
            onChange={handleEndDateChange}
            placeholder="Конечная дата"
          />
          <Select
            className='multiSelect'
            mode="multiple"
            placeholder="Показатели:"
            options={metricOptions}
            value={selectedMetrics}
            onChange={handleMetricsChange}
            maxTagCount={1}
            maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}`}
          />
          {errorMessage && (
            <span className='errorMessage'>{errorMessage}</span>
          )}
          <Button className="buttonMetric" type="primary" onClick={handleFilterData}>
            Показать
          </Button>
        </form>
        <Table<DataType>
          bordered={true}
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Typography.Title level={2}>Детальная информация за выбранную дату:</Typography.Title>
        <Typography.Title level={3}>{selectedDate}</Typography.Title>
        <p><i>Показатели:</i></p>
        <ul>
          {modalTags?.tags?.map((tag, index) => (
            <li key={`${tag}-${index}`}>
              {tag}
            </li>
          ))}
        </ul>
      </Modal>
    </ConfigProvider>
  );
}

export default MetricPage;