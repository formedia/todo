import React from 'react';
import { FixedSizeList as List } from 'react-window';

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: Array<{ id: number; name: string; email: string }>;
}
const Row: React.FC<RowProps> = ({ index, style, data }) => {
  const item = data[index];
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        padding: '10px',
        borderBottom: '1px solid #ddd',
      }}
    >
      {' '}
      <div style={{ width: '50px', textAlign: 'center' }}>{item.id}</div>{' '}
      <div style={{ flex: 1 }}>{item.name}</div>{' '}
      <div style={{ flex: 2 }}>{item.email}</div>{' '}
    </div>
  );
};
interface VirtualizedTableProps {
  data: Array<{ id: number; name: string; email: string }>;
}
const VirtualizedTable: React.FC<VirtualizedTableProps> = React.memo(function VTable({ data }) {
  const RowRenderer = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => <Row index={index} style={style} data={data} />;
  console.log('VirtualizedTable rendered');
  return (
    <List
      height={400} // 表示エリアの高さ
      itemCount={data.length} // データの総数
      itemSize={50} // 各行の高さ
      width="100%" // テーブルの幅
    >
      {RowRenderer}
    </List>
  );
});
export default VirtualizedTable;
