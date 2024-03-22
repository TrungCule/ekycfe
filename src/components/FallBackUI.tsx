import React from 'react';
import { Button, Result, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

interface Props {
  error: Error;
  setError: () => void;
}

const { Paragraph } = Typography;

const FallBackUI: React.FC<Props> = ({ error, setError }) => {
  const router = useRouter();

  return (
    <Result
      status="500"
      title="Sorry, something went wrong."
      subTitle="If the error keeps occurring, please file
      a bug report with the following details, and include any steps to reproduce the issue."
      className="w-[80%] mx-auto"
      extra={
        <div className="flex items-center justify-center gap-4">
          <Button type="primary" target={'_blank'}>
            Report problems
          </Button>
          <Button
            onClick={() => {
              setError();
              router.push('/');
            }}
          >
            Back Home
          </Button>
        </div>
      }
    >
      <Paragraph>
        <p className="font-bold text-lg">
          <CloseCircleOutlined className="text-red-500" /> The content you submitted has the following error:
        </p>
      </Paragraph>
      <Paragraph>
        <pre>{error.stack.toString()}</pre>
      </Paragraph>
    </Result>
  );
};

export default FallBackUI;
