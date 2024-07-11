import type { Meta } from '@storybook/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../components/ui/sheet';
import Select from 'react-select';
import LegacySelect from 'legacy-react-select';
import Button from '@atlaskit/button/standard-button';
import { defaultArgs, groupedOptions } from '../data';
import { Field, Stack } from '../components';
import { Input } from '../components/ui/input';

export default {
  title: 'Select/RadixDialog',
  component: Select,
  argTypes: {},
} as Meta<typeof Select>;

const Template = (props) => {
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
              {/* <Field label="Legacy Select" htmlFor="select-id4">
                <LegacySelect {...props} inputId="select-id4" />
              </Field> */}
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
