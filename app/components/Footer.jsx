import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-5">
      <ul className="flex justify-center items-center gap-x-8">
        <li>
          <a href="#">
            <Image
              src="./icon-facebook.svg"
              width={25}
              height={25}
              alt="social links"
            />
          </a>
        </li>
        <li>
          <a href="#">
            <Image
              src="./icon-twitter.svg"
              width={25}
              height={25}
              alt="social links"
            />
          </a>
        </li>
        <li>
          <a href="#">
            <Image
              src="./icon-instagram.svg"
              width={25}
              height={25}
              alt="social links"
            />
          </a>
        </li>
        <li>
          <a href="#">
            <Image
              src="./icon-linkedin.svg"
              width={25}
              height={25}
              alt="social links"
            />
          </a>
        </li>
      </ul>

      <p className="text-sm text-center mt-5">
        Copyright © 2023-2024 MRN. All Rights reserved.
      </p>
    </footer>
  );
}
