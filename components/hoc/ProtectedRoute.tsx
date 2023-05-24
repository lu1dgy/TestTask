import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = <T extends {}>(WrappedComponent: React.ComponentType<T>) => {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();

    //todo: add auth logic from api
    const isAuthenticated = true;

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    return isAuthenticated && <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return ComponentWithAuth;
};

export default withAuth;
