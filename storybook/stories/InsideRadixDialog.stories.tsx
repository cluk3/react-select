import type { Meta } from '@storybook/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet';
import Select, { type GroupBase, type SelectProps } from 'react-select';
import Button from '@atlaskit/button/standard-button';
import { type ColourOption, defaultArgs, groupedOptions } from '../data';
import { Field, Stack } from '../components';
import { Input } from '../components/ui/input';

export default {
  title: 'Select/RadixDialog',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = (
  props: SelectProps<ColourOption, false, GroupBase<ColourOption>>
) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Form</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sample Form</SheetTitle>
          </SheetHeader>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack>
              <Input type="text" placeholder="Enter your name" />
              <Input type="email" placeholder="Enter your email" />

              <Field label="Select" htmlFor="select-id">
                <Select {...props} inputId="select-id" />
              </Field>
              <Field label="Select" htmlFor="select-id2">
                <Select {...props} inputId="select-id2" />
              </Field>
              <Input type="textarea" placeholder="Enter your message" />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export const RadixDialog = {
  render: Template,
  args: {
    ...defaultArgs,
    options: groupedOptions,
  },
};
