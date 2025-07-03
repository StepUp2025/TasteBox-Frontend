import React from 'react';

export const Divider = () => (
  <hr style={{ margin: '24px 0', borderTop: '2px dashed #ccc' }} />
);

export const SectionTitle = ({ text }: { text: string }) => (
  <h2 style={{ marginBottom: 12 }}>{text}</h2>
);

export const TestButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    style={{
      margin: '4px 8px 8px 0',
      padding: '8px 12px',
      fontSize: 14,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {label}
  </button>
);

export const useTestLogger = () => {
  const [log, setLog] = React.useState<string>('');

  const logResult = (label: string, data: any) => {
    setLog((prev) => `${prev}\n\n[${label}]\n${JSON.stringify(data, null, 2)}`);
  };

  return { log, logResult };
};
