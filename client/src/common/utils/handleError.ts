import { Dispatch } from 'react';

import { IToastContent } from 'components';
import { openToast } from 'store/ui';
import { ResponseError } from 'common/types/http';

export const handleHttpError =
  (error: ResponseError) =>
  (
    dispatch: Dispatch<{
      payload: IToastContent;
      type: string;
    }>
  ) => {
    dispatch(
      openToast({
        status: 'error',
        message:
          error?.message || error?.data || 'Error. Please try again later.',
      })
    );
  };
