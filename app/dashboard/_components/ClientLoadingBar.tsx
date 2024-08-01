'use client';

import React, { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ClientLoadingBar() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setProgress(100);
  }, [pathname, searchParams]);

  return (
    <LoadingBar
      color="#F4CE14"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
}