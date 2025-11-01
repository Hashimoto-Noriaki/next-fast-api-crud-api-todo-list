import {
  Button,
  Input,
  Label,
  Textarea,
  Checkbox,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Spinner,
  ErrorMessage,
  Skeleton,
} from "@/shared/components/atoms";

export default function ComponentsPreviewPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">コンポーネントプレビュー</h1>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Inputs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="email" required>
              Email
            </Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="error-input">Input with Error</Label>
            <Input
              id="error-input"
              error="このフィールドは必須です"
              placeholder="Error state"
            />
            <ErrorMessage message="このフィールドは必須です" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="詳細を入力してください..."
            />
          </div>
          <Checkbox id="terms" label="利用規約に同意する" />
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This is the card content. You can put any content here.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>

      {/* Spinner */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Spinner</h2>
        <div className="flex gap-4 items-center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>

      {/* Skeleton */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Skeleton</h2>
        <div className="space-y-2 max-w-md">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </section>
    </div>
  );
}
