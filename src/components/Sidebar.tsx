import React from 'react'
import { Book, Computer, GithubIcon, LinkedinIcon, RssIcon, TwitterIcon } from "lucide-react";
import Link from 'next/link';
import { PrettyList, PrettyListItem } from './PrettyList';
import Image from 'next/image';
import SocialLink from './SocialLink';


const Sidebar = () => {
  return (
    <div className="card hidden md:block max-w-xs h-full">
      <div className='w-full h-full font-medium'>
        <div className='w-full h-full flex flex-col items-center gap-4 overflow-y-auto'>
          <h1 className="text-3xl flex flex-col items-center font-extrabold text-purple-950 gap-1">
            <span>Hi.</span>
            <span>I&apos;m Anatolii.</span>
          </h1>
          <Link href="/">
            <Image
              src="/images/avatar.jpg"
              className="rounded-full w-48 h-48"
              width={48}
              height={48}
              alt="avatar"
            />
          </Link>
          <div
            className="flex flex-row gap-2 w-full justify-center"
          >
            <SocialLink
              href="https://www.linkedin.com/in/akmetiuk/"
              icon={<LinkedinIcon />}
            />
            <SocialLink
              href="https://github.com/anatoliykmetyuk"
              icon={<GithubIcon />}
            />
            <SocialLink
              href="https://twitter.com/akmetiuk"
              icon={<TwitterIcon />}
            />
            <SocialLink href="/rss.xml" icon={<RssIcon />} />
          </div>
          <PrettyList className="flex flex-col items-center gap-2 max-w-s text-left px-2 mt-3">
            <PrettyListItem icon={<Computer />}>
              I&apos;m a Scala Engineer at the{" "}
              <Link href="https://scala.epfl.ch" target="_blank" className="link">
                Scala Center
              </Link>
              .
            </PrettyListItem>
            <PrettyListItem icon={<Book />}>
              <Link
                href="https://www.amazon.com/Mastering-Functional-Programming-techniques-programming/dp/1788620798/"
                target="_blank"
                className="link"
              >
                Mastering Functional Programming
              </Link>
            </PrettyListItem>
            <PrettyListItem icon={<Book />}>
              <Link
                href="/files/story-of-one-library.pdf"
                target="_blank"
                className="link"
              >
                A Story of One Library: Introduction to Functional Architectures
              </Link>
            </PrettyListItem>
          </PrettyList>
        </div>
      </div>
    </div>
  );
}

export default Sidebar