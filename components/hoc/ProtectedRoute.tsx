import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();

    //todo: add auth logic from api
    const isAuthenticated = true;

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
