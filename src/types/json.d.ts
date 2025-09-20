declare module '*.json' {
  const value: {
    items: Array<{
      id: string;
      title: string;
      price_AUD: number;
      compare_at_price_AUD?: number;
      images: {
        main: string;
        thumb: string;
        placeholder: string;
      };
      short_description?: string;
      attributes?: Record<string, any>;
      category_ids?: string[];
      categories?: string[];
    }>;
    categories?: Array<{
      id: string;
      name: string;
      slug: string;
      description?: string;
    }>;
  };
  export default value;
}
