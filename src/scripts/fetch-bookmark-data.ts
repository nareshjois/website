import { CookieJar } from "tough-cookie";
import { got } from "got";
import charset from "charset";
import iconv from "iconv-lite";
import metascraper from "metascraper";
import metascraperUrl from "metascraper-url";
import metascraperTitle from "metascraper-title";
import metascraperDescription from "metascraper-description";
import metascraperAuthor from "metascraper-author";
import metascraperPublisher from "metascraper-publisher";
import metascraperImage from "metascraper-image";
import metascraperLogoFavIcon from "metascraper-logo-favicon";
import metascraperLogo from "metascraper-logo";

const externalRequest = got.extend({
  headers: {
    "user-agent": "Astro",
  },
  hooks: {
    init: [],
    beforeRequest: [],
    beforeRedirect: [],
  },
});

export const fetchBookmarkData = async (url: string, html: any) => {
  const ms = metascraper([
    metascraperUrl(),
    metascraperTitle(),
    metascraperDescription(),
    metascraperAuthor(),
    metascraperPublisher(),
    metascraperImage(),
    metascraperLogoFavIcon(),
    metascraperLogo(),
  ]);

  let scraperResponse: any = await ms({ html, url });

  const metadata = Object.assign({}, scraperResponse, {
    thumbnail: scraperResponse.image,
    icon: scraperResponse.logo,
  });

  return {
    url,
    metadata,
  };
};

const fetchPage = async (url: string, options: any) => {
  const cookieJar = new CookieJar();
  return externalRequest(url, {
    cookieJar,
    method: "GET",
    followRedirect: true,
    ...options,
  });
};

export const fetchPageHtml = async (url: string) => {
  // Fetch url and get response as binary buffer to
  // avoid implicit cast
  const {
    headers,
    body,
    url: responseUrl,
  } = await fetchPage(url, {
    encoding: "binary",
    responseType: "buffer",
  });

  try {
    // Detect page encoding which might not be utf-8
    // and decode content
    const encoding = charset(headers, body as any);

    if (encoding === null) {
      return {
        body: body.toString(),
        url: responseUrl,
      };
    }

    const decodedBody = iconv.decode(Buffer.from(body, "binary"), encoding);

    return {
      body: decodedBody,
      url: responseUrl,
    };
  } catch (err) {
    return {
      body: body.toString(),
      url: responseUrl,
    };
  }
};
