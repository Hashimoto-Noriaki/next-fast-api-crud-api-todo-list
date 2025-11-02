'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/shared/components/atoms';
import { logoutAction } from '@/features/auth/actions';
import { ROUTES } from '@/shared/lib/constants';

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    const result = await logoutAction();

    if (result.success) {
      router.push(ROUTES.LOGIN);
      router.refresh();
    } else {
      alert('ログアウトに失敗しました');
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="md"
      onClick={handleLogout}
      isLoading={isLoading}
    >
      ログアウト
    </Button>
  );
}
