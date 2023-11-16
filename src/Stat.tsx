import { Button } from "antd";
import { IData } from "./utils/types";

interface IProps extends IData {
  onClose: () => void;
}

const Stat = ({ onClose }: IProps) => {
  return (
    <div>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default Stat;

