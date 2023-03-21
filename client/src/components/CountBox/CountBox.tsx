import './CountBox.scss';

export interface ICountBoxProps {
  title: string;
  value: string | number;
}

const CountBox = ({ title, value }: ICountBoxProps) => {
  return (
    <div className="count-box">
      <div className="count-box__value">{value}</div>
      <div className="count-box__title">{title}</div>
    </div>
  );
};

export { CountBox };
