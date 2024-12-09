'use client';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import Button from 'app/common_components/Button';
import Toast from 'app/common_components/Toast/Toast';
import { useState } from 'react';

interface Props {
  isEnabled: boolean;
  onClick: () => void;
}

function SendCertificateBtn({ isEnabled, onClick }: Props) {
  return (
    <Button onClick={onClick} status={isEnabled ? 'Enabled' : 'Disabled'}>
      상대방에게 증명서 보내기
    </Button>
  );
}

export default SendCertificateBtn;
