import { Button } from '@components/ui/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '기본 버튼',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: '삭제 버튼',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: '아웃라인 버튼',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: '보조 버튼',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: '고스트 버튼',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: '링크 버튼',
    variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: '작은 버튼',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: '큰 버튼',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: '🔍',
    size: 'icon',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화 버튼',
    disabled: true,
  },
};
