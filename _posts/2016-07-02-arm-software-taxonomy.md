---
layout: post
title: "FEAF Software Taxonomy"
subtitle: "ARM in JSON Format"
date: 2016-07-02 12:52:01 -0500
comments: true
categories: [EA, Taxonomies]
keywords: ea,arm,feaf,taxonomy
tags:
  - "Enterprise Architecture"
  - "Taxonomies"
  - "FEAF"
---


I was looking for a software taxonomy as part of an EA Technology Identification effort. The [Federal Enterprise Architecture Framework (FEAF)](https://www.whitehouse.gov/sites/default/files/omb/assets/egov_docs/fea_v2.pdf) publishes a set of taxonomies that are a good starting point. The Application Reference Model (ARM) in particular was close to what I was looking for.

<!--more-->

I have plans to keep the taxonomy on a data store and test different technologies like graph databases to look into internal dependencies and such. I could not find any suitable source for this, as far as I can tell, the taxonomy is only published as a PDF document. I decided to extract the information and save it on JSON format to be able to move it around and manipulate it. You can check the unmodified FEAF v2 ARM Taxonomy on JSON on [GitHub](https://github.com/callmegar/ARM_Taxonomy).

I do not have a use for every line, some of them are government specific and the descriptions mention the government and agencies, so I am changing those to be more enterprise oriented, I am also adding types and areas to the taxonomy to account for infrastructure management software for example. Our shop is heavy on internal development so I am extending the software development categories also, I will publish the modified version when finished.