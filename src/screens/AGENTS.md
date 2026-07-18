# Quy Tắc Thư Mục Screens

## Mục đích

Thư mục này chứa các screen components cấp cao đại diện cho các view hoặc trang hoàn chỉnh. Các screens được tạo nên từ nhiều components nhỏ hơn.

## Quy Tắc Chung

- **API:** Luôn dùng api từ thư mục `api` và api có sẵn của payload cms
- **Giao diện:** Luôn dùng giao diện từ TailwindCSS và Shadcn UI
- **Components:** Luôn import và tái sử dụng component có sẵn từ thư mục `/components`
- **Store:** Luôn dùng store từ thư mục `/store` cho global state
- **Hooks:** Luôn dùng custom hooks từ thư mục `/hooks` cho logic phức tạp
- **Services:** Luôn dùng services từ thư mục `/services` cho business logic
- **Types:** Import types từ thư mục `payload type`
- **Utils:** Sử dụng utility functions từ thư mục `/utils`

## Cấu Trúc Screen

### Cấu Trúc Cơ Bản

```
screens/
  FeatureScreen/
    index.tsx          # File giao diện chính của screen
    components/        # Components đặc thù cho screen này
      FeatureCard.tsx
      FeatureList.tsx
    hooks/            # Custom hooks đặc thù cho screen này
      useFeatureData.ts
      useFeatureFilter.ts
```

### Cấu Trúc Nâng Cao

Khi có components phức tạp cần tách nhỏ hơn, có thể tạo thư mục con:

```
screens/
  FeatureScreen/
    index.tsx                    # Screen chính
    components/
      SimpleComponent.tsx        # Component đơn giản (file)
      ComplexComponent/          # Component phức tạp (thư mục)
        index.tsx               # Component chính
        components/             # Sub-components
          SubComponent.tsx
          AnotherSubComponent.tsx
        hooks/                  # Hooks riêng cho component
          useComplexLogic.ts
      feature.utils.ts          # Utility functions
    hooks/
      useScreenData.ts          # Fetch data
      useScreenActions.ts       # Actions
      useScreenState.ts         # State management
```

**Quy tắc cho cấu trúc nâng cao:**

- Nếu component có >200 lines → tách thành thư mục riêng
- Thư mục component con chứa: `index.tsx`, `components/`, `hooks/`
- Giữ nguyên tên component trong `index.tsx`
- Tạo `utils.ts` nếu có helper functions dùng chung

### index.tsx - File Chính

Đây là file giao diện chính của screen, chịu trách nhiệm:

1. **Fetch dữ liệu** thông qua custom hooks
2. **Quản lý state** cục bộ của screen
3. **Xử lý events** và logic điều khiển
4. **Compose UI** từ các components nhỏ hơn

```typescript
export const FeatureScreen = () => {
  // 1. Fetch dữ liệu qua hooks
  const { data, loading, error } = useFeatureData();

  // 2. State management cục bộ
  const [filter, setFilter] = useState("");

  // 3. Event handlers
  const handleAction = () => {
    /* ... */
  };

  // 4. Compose UI
  return (
    <Layout>
      <Header />
      <FeatureContent data={data} loading={loading} />
      <Footer />
    </Layout>
  );
};
```

### components/ - Thư Mục Components

- Chứa các components được tách ra từ `index.tsx`
- Các components này CHỈ được sử dụng trong screen hiện tại
- Nếu component được dùng ở nhiều nơi, hãy chuyển sang `/components`
- Đặt tên rõ ràng theo chức năng: `FeatureCard.tsx`, `FeatureFilter.tsx`

#### Components Đơn Giản (File)

Khi component nhỏ (<200 lines), tạo file trực tiếp:

```
components/
  SimpleComponent.tsx       # Component đơn giản
  AnotherComponent.tsx      # Component khác
  ModalComponent.tsx        # Modal component
```

#### Components Phức Tạp (Thư Mục)

Khi component lớn (>200 lines), tách thành thư mục:

```
components/
  ComplexComponent/
    index.tsx                    # Export component chính
    components/
      SubComponent.tsx           # Sub-component
      AnotherSubComponent.tsx    # Sub-component khác
    hooks/
      useComplexLogic.ts         # Logic hook
```

**Lợi ích của cấu trúc này:**

- Dễ bảo trì: logic tách biệt rõ ràng
- Dễ test: có thể test từng sub-component riêng
- Dễ mở rộng: thêm sub-components mới mà không ảnh hưởng cấu trúc
- Tránh file quá lớn: giữ mỗi file <200 lines

### hooks/ - Thư Mục Hooks

#### Hooks Cấp Screen

Chứa custom hooks được tách ra từ `index.tsx`:

```
hooks/
  useScreenData.ts        # Fetch data từ API
  useScreenActions.ts     # Actions (delete, toggle, etc)
  useScreenState.ts       # State management
```

**Quy tắc:**

- Hooks xử lý logic phức tạp đặc thù cho screen này
- Nếu hook được dùng ở nhiều screen, hãy chuyển sang `/hooks` (root)
- Đặt tên theo convention: `useFeatureName.ts`
- Mỗi hook nên có trách nhiệm rõ ràng (single responsibility)

#### Hooks Cấp Component

Khi component được tách thành thư mục, có thể có hooks riêng:

```
components/
  ComplexComponent/
    hooks/
      useComponentLogic.ts    # Logic hook cho component
```

**Quy tắc:**

- Hooks này CHỈ được dùng bởi component cha và con của nó
- Không import từ component khác
- Nếu cần dùng ở nhiều component, chuyển lên `../hooks/`

## Import/Export Convention

### Cấu Trúc Cơ Bản

```typescript
// screens/FeatureScreen/index.tsx
import { SimpleComponent } from './components/SimpleComponent'
import { ComplexComponent } from './components/ComplexComponent'
import { useScreenData } from './hooks/useScreenData'

export const FeatureScreen = () => {
  // ...
}
```

### Cấu Trúc Nâng Cao (Component Phức Tạp)

```typescript
// screens/FeatureScreen/components/ComplexComponent/index.tsx
import { SubComponent } from './components/SubComponent'
import { useComplexLogic } from './hooks/useComplexLogic'

export const ComplexComponent: React.FC<Props> = (props) => {
  const { state, handlers } = useComplexLogic(props)
  // ...
}

// screens/FeatureScreen/components/ComplexComponent/hooks/useComplexLogic.ts
export const useComplexLogic = (props: Props) => {
  // ...
  return { state, handlers }
}

// screens/FeatureScreen/components/ComplexComponent/components/SubComponent.tsx
export const SubComponent: React.FC<SubProps> = (props) => {
  // ...
}
```

**Quy tắc Import:**

1. Import từ `./components/` cho sub-components
2. Import từ `./hooks/` cho hooks cấp component
3. Import từ `../hooks/` cho hooks cấp screen
4. Import từ `@/` cho shared components, hooks, services

## Nguyên Tắc Screen Components

### 1. Quan Hệ với /app (Next.js Routes)

- Screen components được import vào `/app` routes
- File `/app/page.tsx` nên là wrapper mỏng xung quanh screens
- Separation này giúp dễ test và có thể migrate framework

### 2. Tổ Chức Code

- Giữ screen tập trung vào **composition**, không phải implementation
- Delegate logic phức tạp xuống hooks và services
- Truyền data xuống child components qua props
- Handle loading và error states ở cấp screen

### 3. Data Fetching

- Sử dụng custom hooks từ `/hooks` để fetch data
- Import API functions từ `/api`
- KHÔNG call API trực tiếp trong component
- Handle các states: loading, error, success

### 4. State Management

- Local state: Dùng `useState` cho state đặc thù của screen
- Global state: Dùng store từ `/store` (auth, user preferences, etc.)
- Server state: Dùng custom hooks tích hợp với API layer

### 5. TypeScript

- Định nghĩa types rõ ràng cho props và state
- Import types từ `/types`
- Tránh dùng `any` - sử dụng `unknown` và type guards

### 6. Styling

- Sử dụng TailwindCSS cho styling
- Sử dụng Ant Design components khi phù hợp
- Tuân theo design system đã thiết lập
- Đảm bảo responsive design cho mọi screen size

## Quy Tắc Refactoring Components

### Khi Nào Tách Component Thành Thư Mục?

**Tách thành thư mục khi:**

- Component file vượt quá 200 lines
- Component có >3 sub-components
- Component có logic phức tạp cần hooks riêng
- Component có utility functions riêng

**Ví dụ:**

```
Trước: ComplexComponent.tsx (400+ lines)
Sau:
  ComplexComponent/
    index.tsx (100 lines) - Component chính
    components/
      SubComponent.tsx
      AnotherSubComponent.tsx
    hooks/
      useComplexLogic.ts
```

### Quy Tắc Tách Component

1. **Tạo thư mục con** với tên component
2. **Tạo `index.tsx`** export component chính
3. **Tạo `components/`** cho sub-components
4. **Tạo `hooks/`** cho hooks riêng (nếu cần)
5. **Tạo `utils.ts`** cho helper functions (nếu cần)
6. **Giữ nguyên tên export** trong `index.tsx`

### Quy Tắc Tách Hooks

1. **Hooks cấp component** → `components/ComponentName/hooks/`
2. **Hooks cấp screen** → `hooks/`
3. **Hooks dùng chung** → `/hooks` (root)

**Dấu hiệu cần tách hook:**

- Logic >100 lines
- Có multiple `useState` hoặc `useEffect`
- Logic có thể tái sử dụng ở component khác

### Quy Tắc Tách Utils

1. **Utils cấp component** → `components/ComponentName/utils.ts`
2. **Utils cấp screen** → `feature.utils.ts`
3. **Utils dùng chung** → `/utils` (root)

**Ví dụ:**

```typescript
// screens/FeatureScreen/components/feature.utils.ts
export const formatData = (data: any) => {
  return data.toUpperCase()
}

export const getLabel = (type: string) => {
  const labels: Record<string, string> = {
    type1: 'Label 1',
    type2: 'Label 2',
  }
  return labels[type] || type
}
```

## Best Practices

### ✅ NÊN

- Giữ screens đơn giản và tập trung vào composition
- Tách logic phức tạp ra custom hooks
- Tái sử dụng components từ `/components`
- Handle authentication/authorization ở cấp screen
- Implement skeleton screens cho loading states
- Thêm proper error boundaries
- Viết TypeScript type-safe
- Document các props và behaviors phức tạp

### ❌ KHÔNG NÊN

- Gọi API trực tiếp trong screen component
- Viết inline styles (dùng TailwindCSS)
- Copy-paste code - hãy tạo reusable components/hooks
- Để business logic trong component - chuyển sang services
- Import components từ screens khác (tạo shared component)
- Làm screens quá phức tạp (>300 lines)

## Testing

- Screens là đơn vị chính cho integration tests
- Mock API calls và hooks trong tests
- Test user flows và interactions
- Verify proper error handling và loading states

## SEO và Performance

- Implement proper metadata (khi dùng với `/app`)
- Optimize images và assets
- Lazy load components nặng khi cần
- Sử dụng React.memo cho components render nhiều
- Profile và optimize re-renders

## Accessibility

- Sử dụng semantic HTML
- Thêm ARIA attributes khi cần
- Đảm bảo keyboard navigation
- Test với screen readers
- Maintain proper heading hierarchy
