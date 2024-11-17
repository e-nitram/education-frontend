import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

// TODO: Figure out how to override className elements passed to a Markdown component as a prop and delete this file/component
const components = {
  h1: (props: any) => (
    <h1 {...props} className='font-serif text-42 font-semibold text-white'>
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 {...props} className='font-serif text-lg font-semibold text-white'>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className='font-serif text-26 font-semibold text-white'>
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 {...props} className='font-serif text-md font-semibold text-white'>
      {props.children}
    </h4>
  ),
  p: (props: any) => (
    <p {...props} className='py-2 font-sans text-sm text-lotion'>
      {props.children}
    </p>
  ),
  li: (props: any) => (
    <li {...props} className='p-2 font-sans text-sm text-white'>
      {props.children}
    </li>
  ),
  a: (props: any) => (
    <Link {...props} className='text-white'>
      {props.children}
    </Link>
  ),
  ul: (props: any) => (
    <ul
      {...props}
      className='grid list-outside list-disc grid-cols-2 gap-x-4 p-2 px-4 font-sans  text-sm text-white'
    >
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className='grid list-outside list-decimal grid-cols-2 gap-4 px-4 font-sans text-sm text-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    >
      {props.children}
    </ol>
  ),
};

export function MarkdownFooter(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
