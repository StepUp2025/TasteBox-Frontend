export interface TabOption {
  id: string;
  label: string;
  queryKey: (string | number)[];
  queryFn: (page: number, limit: number) => Promise<any>; // 적절한 제네릭 또는 타입 지정 가능
}
