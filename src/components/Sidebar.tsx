import React from 'react'
import { Book, Computer, GithubIcon, LinkedinIcon, RssIcon, TwitterIcon } from "lucide-react";
import Link from 'next/link';
import SocialLink from './SocialLink';
import { PrettyList, PrettyListItem } from './PrettyList';

const Sidebar = () => {
  return (
    <div className="card flex flex-col items-center gap-4 max-w-sm font-medium">
      <h1 className="text-3xl flex flex-col items-center font-extrabold text-purple-950 gap-1">
        <span>Hi.</span>
        <span>I'm Anatolii.</span>
      </h1>
      <Link href="/">
        <img src="/images/avatar.jpg" className="rounded-full w-48 h-48" />
      </Link>
      {/* <h2 className="text-xl font-bold text-purple-950">I'm Anatolii.</h2> */}
      <div className="flex flex-row gap-2 w-full justify-center">
        <SocialLink
          href="https://www.linkedin.com/in/akmetiuk/"
          icon={<LinkedinIcon />}
        />
        <SocialLink
          href="https://github.com/anatoliykmetyuk"
          icon={<GithubIcon />}
        />
        <SocialLink href="https://twitter.com/akmetiuk" icon={<TwitterIcon />} />
        <SocialLink href="/rss.xml" icon={<RssIcon />} />
      </div>
      <PrettyList className="flex flex-col items-center gap-2 max-w-s text-left px-2 mt-3">
        <PrettyListItem icon={<Computer />}>
          I'm a Scala Engineer at the{" "}
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
  );
}

export default Sidebar