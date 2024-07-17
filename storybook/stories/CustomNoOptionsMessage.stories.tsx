import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import type { ClassNamesConfig, NoticeProps } from 'react-select';
import Select, { components } from 'react-select';

import { Field } from '../components';

export default {
  title: 'Select/CustomNoOptionsMessage',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomNoOptionsMessage() {
  return (
    <Field
      label="Custom No Options Message"
      htmlFor="custom-no-options-message-id"
    >
      <Select
        inputId="custom-no-options-message-id"
        components={{ NoOptionsMessage }}
        options={[]}
        classNames={classNames}
      />
    </Field>
  );
}

const classNames: ClassNamesConfig = {
  noOptionsMessage: 'bg-purple-500 text-white',
};

function NoOptionsMessage(props: NoticeProps) {
  return (
    <Tooltip content="Custom NoOptionsMessage Component">
      <components.NoOptionsMessage {...props} />
    </Tooltip>
  );
}
