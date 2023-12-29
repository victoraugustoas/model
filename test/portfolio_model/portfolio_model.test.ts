import { Order } from "../../src/common/order";
import { HundredPercentage, Percentage } from "../../src/common/percentage";
import { Currency } from "../../src/currency/currency";
import { Asset, AssetProps } from "../../src/portfolio_model/asset";
import { AssetDailyShare } from "../../src/portfolio_model/asset_daily_share";
import { PortfolioModel } from "../../src/portfolio_model/portfolio_model";

test("should create a new portfolio model", () => {
  const assets: AssetProps[] = [
    {
      id: 1,
      assetType: "Stock",
      currency: { code: "USD", name: "dólar", symbol: "$" },
      description: "descrição do fundo",
      logo: "https://saks-app-banner-images.s3.us-east-2.amazonaws.com/asset-images/xp.svg",
      name: "XP Inc.",
      participation: 0.5,
      starRate: 5,
      assetDailyCotations: [
        new AssetDailyShare({ date: new Date(), shareValue: 100 }),
      ],
    },
    {
      id: 2,
      assetType: "Stock",
      currency: { code: "EUR", name: "euro", symbol: "€" },
      description: "descrição do fundo",
      logo: "https://saks-app-banner-images.s3.us-east-2.amazonaws.com/asset-images/xp.svg",
      name: "Uber",
      participation: 0.5,
      starRate: 4,
      assetDailyCotations: [
        new AssetDailyShare({ date: new Date(), shareValue: 50 }),
      ],
    },
  ];

  const portfolio = new PortfolioModel({
    id: 1,
    admFee: 0.5,
    assets,
    currency: { code: "USD", symbol: "$", name: "dollar" },
    description: "Bonds portfolio",
    gracePeriod: 5,
    highlighted: false,
    minimumInvestment: 500,
    name: "Bonds portfolio",
    order: 2,
    redeemPeriod: 10,
  });

  expect(portfolio.id).toBe(1);
  expect(portfolio.admFee).toStrictEqual(new HundredPercentage(0.5));
  expect(portfolio.assets).toStrictEqual(
    assets.map((props) => new Asset(props))
  );
  expect(portfolio.currency).toStrictEqual(
    new Currency({ code: "USD", symbol: "$", name: "dollar" })
  );
  expect(portfolio.description).toBe("Bonds portfolio");
  expect(portfolio.gracePeriod).toBe(5);
  expect(portfolio.highlighted).toBe(false);
  expect(portfolio.minimumInvestment).toBe(500);
  expect(portfolio.name).toBe("Bonds portfolio");
  expect(portfolio.order).toStrictEqual(new Order(2));
  expect(portfolio.redeemPeriod).toBe(10);
});

test("should calculate correct nominal profitability with one asset", () => {
  const assets: AssetProps[] = [
    {
      id: 1,
      assetType: "Stock",
      currency: { code: "USD", name: "dólar", symbol: "$" },
      description: "descrição do fundo",
      logo: "https://saks-app-banner-images.s3.us-east-2.amazonaws.com/asset-images/xp.svg",
      name: "XP Inc.",
      participation: 1,
      starRate: 5,
      assetDailyCotations: [
        new AssetDailyShare({ date: new Date(2023, 1, 1), shareValue: 100 }),
        new AssetDailyShare({ date: new Date(2023, 1, 2), shareValue: 99 }),
        new AssetDailyShare({ date: new Date(2023, 1, 3), shareValue: 98 }),
        new AssetDailyShare({ date: new Date(2023, 1, 4), shareValue: 107 }),
      ],
    },
  ];

  const portfolio = new PortfolioModel({
    id: 1,
    admFee: 0.5,
    assets,
    currency: { code: "USD", symbol: "$", name: "dollar" },
    description: "Bonds portfolio",
    gracePeriod: 5,
    highlighted: false,
    minimumInvestment: 500,
    name: "Bonds portfolio",
    order: 2,
    redeemPeriod: 10,
  });

  console.log(
    portfolio.nominalProfitability(new Date(2023, 1, 1), new Date(2023, 1, 4))
  );

  expect(
    portfolio.nominalProfitability(new Date(2023, 1, 1), new Date(2023, 1, 4))
  ).toStrictEqual([
    new Percentage(0),
    new Percentage(-0.01),
    new Percentage(-0.02),
    new Percentage(0.07),
  ]);
});

test("should calculate correct nominal profitability with two assets", () => {
  const assets: AssetProps[] = [
    {
      id: 1,
      assetType: "Stock",
      currency: { code: "USD", name: "dólar", symbol: "$" },
      description: "descrição do fundo",
      logo: "https://saks-app-banner-images.s3.us-east-2.amazonaws.com/asset-images/xp.svg",
      name: "XP Inc.",
      participation: 0.5,
      starRate: 5,
      assetDailyCotations: [
        new AssetDailyShare({ date: new Date(2023, 1, 1), shareValue: 100 }),
        new AssetDailyShare({ date: new Date(2023, 1, 2), shareValue: 150 }),
      ],
    },
    {
      id: 2,
      assetType: "Stock",
      currency: { code: "USD", name: "dólar", symbol: "$" },
      description: "descrição do fundo",
      logo: "https://saks-app-banner-images.s3.us-east-2.amazonaws.com/asset-images/xp.svg",
      name: "Uber",
      participation: 0.5,
      starRate: 5,
      assetDailyCotations: [
        new AssetDailyShare({ date: new Date(2023, 1, 1), shareValue: 100 }),
        new AssetDailyShare({ date: new Date(2023, 1, 2), shareValue: 150 }),
      ],
    },
  ];

  const portfolio = new PortfolioModel({
    id: 1,
    admFee: 0.5,
    assets,
    currency: { code: "USD", symbol: "$", name: "dollar" },
    description: "Bonds portfolio",
    gracePeriod: 5,
    highlighted: false,
    minimumInvestment: 500,
    name: "Bonds portfolio",
    order: 2,
    redeemPeriod: 10,
  });

  console.log(
    portfolio.nominalProfitability(new Date(2023, 1, 1), new Date(2023, 1, 4))
  );

  expect(
    portfolio.nominalProfitability(new Date(2023, 1, 1), new Date(2023, 1, 4))
  ).toStrictEqual([
    new Percentage(0),
    new Percentage(-0.01),
    new Percentage(-0.02),
    new Percentage(0.07),
  ]);
});
