import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명을 여기에 넣을 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          카드 내용은 이곳에 들어갑니다. 텍스트나 다른 컴포넌트를 넣을 수
          있습니다.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">취소</Button>
        <Button>저장</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>알림</CardTitle>
      </CardHeader>
      <CardContent>
        <p>새로운 메시지가 도착했습니다.</p>
      </CardContent>
    </Card>
  ),
};

export const OnlyContent: Story = {
  render: () => (
    <Card className="w-[350px] p-4">
      <p>헤더나 푸터 없이 내용만 있는 카드입니다.</p>
    </Card>
  ),
};
