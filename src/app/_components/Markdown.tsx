import { randomUUID } from 'crypto';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: (props: any) => (
    <h1 {...props} className='font-serif text-42 font-semibold text-[#2541B2]'>
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 {...props} className='font-serif text-lg font-semibold text-[#2541B2]'>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className='font-serif text-26 font-semibold text-[#2541B2]'>
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 {...props} className='font-serif text-md font-semibold text-[#2541B2]'>
      {props.children}
    </h4>
  ),
  p: (props: any) => (
    <p {...props} className='py-2 font-sans text-sm text-[#161616]'>
      {props.children}
    </p>
  ),
  li: (props: any) => (
    <li
      {...props}
      className='p-2 font-sans text-sm text-[#2541B2]'
      key={randomUUID()}
    >
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <Link {...props} className='text-[#2541B2]'>
      {props.children}
    </Link>
  ),
  ul: (props: any) => (
    <ul
      {...props}
      className='grid list-outside list-disc grid-cols-2 gap-x-4 p-2 px-4 font-sans  text-sm text-[#2541B2]'
    >
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className='grid list-outside list-decimal grid-cols-2 gap-4 px-4 font-sans text-sm text-[#2541B2] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    >
      {props.children}
    </ol>
  ),
};

export function Markdown(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
