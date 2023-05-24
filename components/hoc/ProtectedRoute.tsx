import { useRouter } from 'next/router'; // Update import statement
import { useEffect } from 'react';

export function withAuth<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  const ComponentWithAuth = (props: T & React.Attributes) => {
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
