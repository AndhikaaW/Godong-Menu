
export const metadata = {
 title: 'SEO Title',
 description: 'SEO Title',
};
export default function testingLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
        {children}
    </div>
  );
}