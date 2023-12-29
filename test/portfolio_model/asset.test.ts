import { HundredPercentage } from "../../src/common/percentage";
import { RateStars } from "../../src/common/rate_stars";
import { UrlLink } from "../../src/common/url_link";
import { Currency } from "../../src/currency/currency";
import { Asset } from "../../src/portfolio_model/asset";
import { AssetDailyShare } from "../../src/portfolio_model/asset_daily_share";

test("should create a new asset", () => {
  const currency = new Currency({ code: "USD", name: "dólar", symbol: "$" });
  const logo =
    "https://saks-app-banner-images.s3.us-east-2.amazonaws.com/asset-images/xp.svg";
  const participation = 0.5;
  const starRate = 5;
  const assetDailyCotations = [
    new AssetDailyShare({ date: new Date(), shareValue: 100 }),
  ];
  const asset = new Asset({
    id: 1,
    assetType: "Stock",
    currency,
    description: "descrição do fundo",
    logo,
    name: "XP Inc.",
    participation,
    starRate,
    assetDailyCotations,
  });

  expect(asset.id).toBe(1);
  expect(asset.assetType).toBe("Stock");
  expect(asset.currency).toStrictEqual(currency);
  expect(asset.description).toBe("descrição do fundo");
  expect(asset.logo).toStrictEqual(new UrlLink(logo));
  expect(asset.name).toBe("XP Inc.");
  expect(asset.participation).toStrictEqual(
    new HundredPercentage(participation)
  );
  expect(asset.starRate).toStrictEqual(new RateStars(starRate));
  expect(asset.assetDailyCotations).toStrictEqual(assetDailyCotations);
});
