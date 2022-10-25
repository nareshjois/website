---
layout: "../../layouts/BlogPost.astro"
title: "Tilera debuts its sixty-four core processor"
description: ""
pubDate: "2007-08-21 14:13:32"
heroImage: ""
slug: "tilera-debuts-its-sixty-four-core-processor"
---

<img src="http://www.blogsmithmedia.com/www.engadget.com/media/2007/08/tilera_425.jpg" alt="" width="425" height="242" />

<strong> Silicon Valley startup Tilera today announced the Tile64, a processor with 64 programmable cores that, according to the company, houses ten times the performance and 30 times the power efficiency of Intel's dual-core Xeon processors.</strong>

Intel may be getting tired of hearing about products performing better than its dual-core processors targeting server and embedded, as the company describes dual-core processors,  at least when it comes to performance, as last year's product. However, when there's a company claiming that it can beat Intel's last year's product by a factor of 10x and 30x, depending on discipline, it's certainly worth a look.

The Tile64 is a 90 nm RISC-based processor clocked between 600 MHz and 1 GHz  aiming for integration in embedded applications such as routers, switches, appliances, video conferencing systems and set-top boxes. Its manufacturer claims that the CPU solves a critical problem in multi-core scaling and opens the door to hundreds or even thousands of cores using this new architecture.

Other than for example Intel's Core architecture, which is expected to soon be running into a bottleneck caused by its centralized bus architecture (which acts as communication node between all cores), Tilera's cores can exchange data with all other cores through a "mesh" architecture. Each of the 64 tiles consists of a CPU unit, a cache unit and a switch, which can send information into four directions to neighboring "tiles". Each tile has a bandwidth of 500 Gb/s, with the Tile64's aggregate bandwidth topping out at 32 Tb/s.

Besides the fact that Tilera claims that it has untangled a data traffic mess that otherwise would have surrounded a central bus, the company has come up with an interesting and flexible cache architecture for the tiles, each of which is able to act as a fully functioning system that can run an operating system. Each tile integrates two 8 KB L1 caches (8 KB iL1, 8 KB dL1) as well as a 64 KB L2 cache. There is no L3 cache per se, but if required by the application, a software developer can utilize all L1 and L2 caches as one 5 MB L3 cache.
<p class="mosimage" align="center"><img src="http://www.tgdaily.com/images/stories/article_images/processor/tilera2_425.jpg" border="0" alt="Image" hspace="6" width="425" height="275" /></p>
<p class="mosimage_caption" style="text-align:left;" align="left">Tile64 layout with 8x8 tiles and ...</p>
<p class="mosimage" align="center"><img src="http://www.tgdaily.com/images/stories/article_images/processor/tilera3_425.jpg" border="0" alt="Image" hspace="6" width="425" height="282" /></p>
<p class="mosimage_caption" style="text-align:left;" align="left">... the layout of one tile in detail.</p>

The result is a claimed performance that is ten times what a dual-core Xeon offers, while performance per watt is exceeding the Xeon by 30x. The manufacturer states that each tile consumes a maximum of 300 mWatt, which translates into a maximum power consumption of 19.2 watts per Tile64 chip. Still, there is enough horsepower to encode eight parallel standard definition video streams at  2 Mb/s per stream, two high definition 720p streams at 7 Mb/s each or one 1080p video stream at 20 Mb/s.

According to Tilera, programmers can get their application up and running on Tile64 "very quickly", while they mentioned that "fine-tuning" will optimize the software's performance.

Tilera said that the processor is available now. For a new entry into the market, Tilera priced its product with confidence: 10K-tray pricing is set at $435 for each Tile64 – which appears cheap, if it can replace ten Xeon processors. But in a real world environment, the processor is priced against a quad-core Xeon 5345 (2.33 GHz, 8 MB L2 cache), which currently sells for a 1K tray price of $455.

Initial customers using the processor in upcoming products include 3Com, Top Layer, Codian and GoBackTV.

Of course, every time a new processor company comes around, there is the question if there is really enough room for another player – in this case, a market where heavyweights such as Intel and Texas Instruments battle for market shares. Other than PA Semi, a relatively new microprocessor company that does not build its processor, but licenses its technology, Tilera is actually manufacturing the Tile64, which is reminiscent of the rise and fall of Transmeta.

If you have been around in this industry for some time, then you may remember that Transmeta was in "stealth mode" from 1997-2000 and reason for media reports mainly because of one famous employee, Linux inventor Linus Torvalds. Transmeta launched with great fanfare in January 2000, but never got a foot on the ground and today is struggling to survive with revenues from licensing its LongRun2 technology to companies such as NEC.

Companies such as Tilera are exposed to the problems that broke Transmeta's neck in CPU manufacturing: Microprocessor buyers today, for example, expect a track record of reliability that new companies cannot offer, buyers expect a support system, extensive manufacturing capabilities, a long-term roadmap that reveals what can be expected in terms of performance and feature set. Transmeta never made it much further than a presence in Asian markets, a few sub-notebooks on these shores as well as exotic computing solutions such as desktop clusters. Tilera, however, believes that it is competing in a different and "aggressively adopting" multi-core market in which it has the performance edge (which Transmeta never had).

During our briefing with Tilera, chief technology officer Anant Agarwal told us that he believes that the company has solved a "huge problem" of multi-core architectures and therefore has a substantial advantage: "We know how to get to hundreds of cores. This means that we are way ahead of the competition."
