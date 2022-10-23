import { ghost } from "./ghost.js";
import fs from "fs";
import path from "path";
const fileString = `---
layout: "../../layouts/BlogPost.astro"
title: "[Title]"
description: "[MetaDescription]"
pubDate: "[PublishedDate]"
heroImage: "[HeroImage]"
slug: "[Slug]"
---

[MdxContent]
`;
ghost.db[0]?.data.posts.forEach((post, ix) => {
  console.log(`${ix.toString().padStart(3,"0")}. Writing ${post.slug}`);
  let postContent = fileString;
  postContent = postContent.replace("[Title]", post.title);
  postContent = postContent.replace(
    "[MetaDescription]",
    post.custom_excerpt ?? ""
  );
  postContent = postContent.replace("[PublishedDate]", post.published_at ?? "");
  postContent = postContent.replace("[HeroImage]", post.feature_image ?? "");
  postContent = postContent.replace("[Slug]", post.slug ?? "");
  const cardContent = JSON.parse(post.mobiledoc);
  postContent = postContent.replace("[MdxContent]", cardContent.cards?.[0]?.[1].markdown ?? post.html);
  fs.writeFileSync(
    path.join("./src/pages/blog", post.slug + ".md"),
    postContent
  );
});
