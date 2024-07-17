import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import Tooltip from '@atlaskit/tooltip';
import type { Meta } from '@storybook/react';
import type { ClassNamesConfig, GroupHeadingProps } from 'react-select';
import Select, { components } from 'react-select';
import { Field } from '../components';
import type { ColourOption, FlavourOption } from '../data';
import { colourOptions, groupedOptions } from '../data';

export default {
  title: 'Select/CustomGroupHeading',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

export function CustomGroupHeading() {
  return (
    <Field label="Custom Group Heading" htmlFor="custom-group-heading-id">
      <Select<ColourOption | FlavourOption>
        inputId="custom-group-heading-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        components={{ GroupHeading }}
        classNames={classNames}
      />
    </Field>
  );
}

const classNames: ClassNamesConfig<ColourOption | FlavourOption> = {
  groupHeading: 'flex-1 text-violet-700 text-lg m-0',
};

function GroupHeading(props: GroupHeadingProps<ColourOption | FlavourOption>) {
  return (
    <div
      style={{
        border: `2px dotted ${colourOptions[2].color}`,
        color: colourOptions[2].color,
        padding: '5px 0px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <components.GroupHeading {...props} />
      <Tooltip content="Custom GroupHeading Component">
        <EditorPanelIcon label="Editor Panel" />
      </Tooltip>
    </div>
  );
}
