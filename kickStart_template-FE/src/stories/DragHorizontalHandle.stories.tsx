import type { Meta, StoryObj } from '@storybook/react';
import { DragHandleHorizontalButton } from '@shared/ui/button/DragHandleHorizontalButton';

type ComponentProps = React.ComponentProps<typeof DragHandleHorizontalButton>;
type StoryProps = ComponentProps & {
  backgroundColor: string;
  paddingSize: number;
  borderRadius: string;
};

const meta: Meta<StoryProps> = {
  title: 'Image/DragHandleHorizontal',
  component: DragHandleHorizontalButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f3f4f6' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};

export const OnCustomBackground: Story = {
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      description: '배경색 설정',
      defaultValue: '#1f2937',
    },
    paddingSize: {
      control: {
        type: 'range',
        min: 0,
        max: 12,
        step: 1,
      },
      description: '패딩 크기 (0-12)',
    },
    borderRadius: {
      control: { type: 'select' },
      options: [
        'rounded-none',
        'rounded-sm',
        'rounded',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-full',
      ],
      description: '모서리 둥글기',
      defaultValue: 'rounded-lg',
    },
  },
  render: (args) => {
    const { backgroundColor, paddingSize, borderRadius } = args;
    const padding = `p-${paddingSize}`;

    return (
      <div className={`${padding} ${borderRadius}`} style={{ backgroundColor }}>
        <DragHandleHorizontalButton />
      </div>
    );
  },
  args: {
    backgroundColor: '#1f2937',
    borderRadius: 'rounded-lg',
    paddingSize: 1,
  },
};
