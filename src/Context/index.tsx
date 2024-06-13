import React from 'react';
import { PhotosProvider } from './providers/photos.provider';

const composeProviders =
  (...providers: any[]) =>
  ({ children }: any) => {
    return providers.reduceRight(
      (child, Provider) => <Provider>{child}</Provider>,
      children,
    );
  };

const Providers = composeProviders(PhotosProvider);

export { Providers };
