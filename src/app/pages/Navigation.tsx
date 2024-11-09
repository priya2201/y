// components/Navigation.tsx
'use client';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/all-products">All Products</Link>
        </li>
        <li>
          <Link href="/add-product">Add Product</Link>
        </li>
        <li>
          <Link href="/edit-product">Edit Product</Link>
        </li>
        <li>
          <Link href="/aboutme">About me</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
