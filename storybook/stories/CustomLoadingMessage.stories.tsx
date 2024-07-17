import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import { useGetClassNames, type NoticeProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Field } from '../components';

import type { ColourOption } from '../data';
import { colourOptions } from '../data';

export default {
  title: 'Select/CustomLoadingMessage',
  component: AsyncSelect,
  argTypes: {},
} as Meta<typeof AsyncSelect>;

export function CustomLoadingMessage() {
  return (
    <Field label="Custom Loading Message" htmlFor="custom-loading-message-id">
      <AsyncSelect
        inputId="custom-loading-message-id"
        cacheOptions
        components={{ LoadingMessage }}
        defaultOptions
        loadOptions={promiseOptions}
        loadingMessage={({ inputValue }) => <>Loading {inputValue}</>}
        classNames={{
          loadingMessage: 'text-white bg-purple-500',
        }}
      />
    </Field>
  );
}

function LoadingMessage(props: NoticeProps) {
  const className = useGetClassNames(
    'loadingMessage',
    props,
    props.innerProps?.className
  );
  return (
    <Tooltip content={'Custom Loading Message'}>
      <div {...props.innerProps} className={className}>
        {props.children}
      </div>
    </Tooltip>
  );
}

function filterColors(inputValue: string) {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

function promiseOptions(inputValue: string) {
  return new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });
}
