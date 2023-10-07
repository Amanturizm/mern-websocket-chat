import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  image?: File | null;
}

const FileInput: React.FC<Props> = ({ onChange, name, image }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState<string>('');

  useEffect(() => {
    if (image === null) {
      setFilename('');
    }
  }, [image]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Button
        variant="contained"
        onClick={activateInput}
        sx={{ textTransform: 'none', width: 100, height: 53, overflow: 'hidden' }}
      >
        {filename || 'Browse'}
      </Button>
    </>
  );
};

export default FileInput;
