'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogout } from '@/app/actions/auth';

export default function LogoutPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        async function logoutAndRefresh() {
            formRef.current?.requestSubmit();
            
            timeoutId = setTimeout(() => {
                router.refresh();

                router.push('/');
            }, 2000);
        }

        logoutAndRefresh();

        return () => clearTimeout(timeoutId);
    }, [router]);
    
    return (
    <div className="max-w-md mx-auto mt-24 p-6 border rounded-md shadow-sm bg-white text-center">
      <h1 className="text-2xl font-bold">Logging out...</h1>
      <p className="text-gray-600 mt-2">You’ll be redirected shortly.</p>

      {/* Hidden logout form */}
      <form ref={formRef} action={handleLogout}></form>
    </div>
    );
    
}