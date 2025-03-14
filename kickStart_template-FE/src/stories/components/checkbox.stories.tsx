import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onCheckedChange: { action: 'checked changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'terms',
    checked: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms">이용약관에 동의합니다</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: {
    id: 'terms',
    checked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms">이용약관에 동의합니다</Label>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    id: 'terms-disabled',
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms-disabled" className="text-muted-foreground">
        비활성화된 체크박스
      </Label>
    </div>
  ),
};

export const CheckboxList: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="option-1" />
        <Label htmlFor="option-1">옵션 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option-2" defaultChecked />
        <Label htmlFor="option-2">옵션 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option-3" />
        <Label htmlFor="option-3">옵션 3</Label>
      </div>
    </div>
  ),
};
