"use strict";

import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

import { FormatInterface } from "@/app/types/interface";
import axios from "axios";

const format = (formats: Array<FormatInterface>) => {
  const totalFormat: Array<FormatInterface> = [];

  formats.forEach((format: any) => {
    if (format?.qualityLabel !== null) {
      totalFormat.push({
        qualityLabel: format?.qualityLabel,
        itag: format?.itag,
      });
    }
  });

  const uniqueArray = totalFormat.filter(
    (v: any, i: any, a: any) =>
      a.findLastIndex((v2: any) => v2.qualityLabel === v.qualityLabel) === i
  );

  return uniqueArray.sort(
    (a: any, b: any) => parseFloat(a.qualityLabel) - parseFloat(b.qualityLabel)
  );
};

// get all format
export default async function url(req: NextApiRequest, res: NextApiResponse) {
  const url = req.body.url;
  try {
    // youtube
    if (url.split("/")[2] === "www.youtube.com") {
      // split
      const slugYtb = url.split("https://www.youtube.com/watch?v=")[1];
      const ytdlResult = await ytdl.getInfo(slugYtb);

      const formats = ytdlResult?.formats;
      const title = ytdlResult?.videoDetails?.title;
      const thumbnails = ytdlResult?.videoDetails?.thumbnails;
      const ytbUrl = ytdlResult?.videoDetails?.video_url;

      // get only one thumbnails and return url thumbnail
      let thumbnailUrl = "";
      thumbnails.forEach((thumbnail) =>
        thumbnail?.width === 336 ? (thumbnailUrl = thumbnail?.url) : ""
      );

      const resultFormat = format(formats);

      // return
      return res.status(200).json({
        result: {
          second: ytdlResult?.videoDetails?.lengthSeconds,
          title,
          url: ytbUrl,
          thumbnail: thumbnailUrl,
          format: resultFormat,
        },
      });
    }
    // instagram
    if (url.split("/")[2] === "www.instagram.com") {
      const igId = url.split("/")[4];

      const options = {
        method: "GET",
        url: "https://instagram-scraper-2022.p.rapidapi.com/ig/post_info/",
        params: {
          shortcode: igId,
        },
        headers: {
          "X-RapidAPI-Key":
            "d280df9834mshbccf37a598cb8a8p1952eejsn29939f952305",
          "X-RapidAPI-Host": "instagram-scraper-2022.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        return res.status(200).json({
          result: {
            thumbnail: response?.data?.thumbnail_src,
            title: response?.data?.owner?.full_name,
            url: response?.data?.video_url,
            format: [
              {
                qualityLabel: response?.data?.dimensions?.width,
              },
            ],
          },
        });
      } catch (error) {
        return res
          .status(402)
          .json({ message: "Something wrong, Please try again!" });
      }
    }

    // url not support
    return res.status(402).json({ message: "Url not support" });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Something wrong, Please try again!" });
  }
}
