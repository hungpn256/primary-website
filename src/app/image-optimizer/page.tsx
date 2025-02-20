import GoogleAds from "@/components/google-ads/google-ads";
import ImageOptimizer from "@/components/Image-optimizer";

export const metadata = {
  title: "Công Cụ Tối Ưu Hình Ảnh",
  description:
    "Tối ưu hóa hình ảnh của bạn một cách nhanh chóng và dễ dàng. Giảm kích thước file mà không làm giảm chất lượng hình ảnh.",
};

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Công Cụ Tối Ưu Hình Ảnh
        </h1>
      </div>
      <GoogleAds />
      <p className="text-center text-muted-foreground mb-8">
        Tối ưu hóa hình ảnh của bạn một cách nhanh chóng và dễ dàng. Giảm kích
        thước file mà không làm giảm chất lượng hình ảnh.
      </p>
      <ImageOptimizer />
    </main>
  );
}
