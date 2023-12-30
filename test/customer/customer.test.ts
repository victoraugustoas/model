import { Customer } from "../../src/customer/customer";
import { LatamOnboardingProps } from "../../src/customer/onboarding/latam_onboarding";

test("deve ter todos os dados preenchidos no onboarding", () => {
  const customer = new Customer({
    address: { id: 1, zipcode: "69073010" },
    country: { code: "CO", name: "Colombia" },
    email: "victor.augusto@gmail.com",
    id: 1,
    name: "Victor Augusto",
    phoneNumber: "+5592982611747",
    refSource: "organic",
    onboarding: {
      birthDate: new Date(),
      tin: "111222",
      document: {
        type: "RG",
        number: "123456",
        country: { code: "CO", name: "Colombia" },
      },
      suitabilityAnswer: { answers: [{ id: 1, order: 1, points: 15 }] },
      personalDocuments: {
        documents: [
          {
            side: "FRONT",
            type: "RG",
            url: "https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg",
          },
          {
            side: "BACK",
            type: "RG",
            url: "https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg",
          },
          {
            side: "FRONT",
            type: "PROOF_OF_ADDRESS",
            url: "https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg",
          },
        ],
      },
    } as LatamOnboardingProps,
  });

  expect(customer.isOnboardingFilled).toBe(true);
});

test("deve retornar falso para dados nao preenchidos no onboarding", () => {
  const customer1 = new Customer({
    country: { code: "CO", name: "Colombia" },
    email: "victor.augusto@gmail.com",
    id: 1,
    name: "Victor Augusto",
    phoneNumber: "+5592982611747",
    refSource: "organic",
    onboarding: {
      birthDate: new Date(),
      tin: "111222",
      document: {
        type: "RG",
        number: "123456",
        country: { code: "CO", name: "Colombia" },
      },
    } as LatamOnboardingProps,
  });

  expect(customer1.isOnboardingFilled).toBe(false);

  const customer2 = new Customer({
    address: { id: 1, zipcode: "123456" },
    country: { code: "CO", name: "Colombia" },
    email: "victor.augusto@gmail.com",
    id: 1,
    name: "Victor Augusto",
    phoneNumber: "+5592982611747",
    refSource: "organic",
    onboarding: {
      birthDate: new Date(),
      tin: "111222",
      document: {
        type: "RG",

        country: { code: "CO", name: "Colombia" },
      },
    } as LatamOnboardingProps,
  });
  expect(customer1.isOnboardingFilled).toBe(false);
});
