import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();

    const isAuthenticated = false;

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return ComponentWithAuth;
}
