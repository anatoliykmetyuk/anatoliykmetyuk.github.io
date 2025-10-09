---
title: "Personal Financial Projection Tool"
description: A technique to build awareness of your financial situation projected into the future.
layout: post
---

One can find enough software for personal finance on the Internet. Typically, this software focuses on reviewing and categorization of your past expenses. Often, there are features like automatic categorization, integration with bank apps, and reminders to pay recurring expenses.

This software typically focuses on the past and present financial situation. I did not find anything that would allow you to build awareness of your future financial situation given your planned expenses and income.

<!-- more -->

This awareness can be critical when planning big purchases or changes in life. In such situations, the data about the past and the present will not apply to the future since the future constraints will be different.

Furthermore, the task is non-trivial, since not all recurring cashflow is born equal. Some subscriptions are charged every month or every 3 months, and some expenses do not repeat in the foreseeable future, like the purchase of a new computer.

## Solution

![Model Overview](/post_assets/2023-03-24-financial-projection/model-overview.png)

[**💾 Get the Template**](https://docs.google.com/spreadsheets/d/1dMgDxpUU7ZbepUQpN81akw8QCtIO0_wsFnjmB_RiEQM/edit?usp=sharing)

The solution I propose takes the form of a Google Sheet. The job of the Sheet is simple: for every given month, predict how much money you will have, given all of your recurring expenses and income.

The sheet has two tabs:

- **🧭 Projection** - where you can see the projection of your balance for every future month.
- **💸 Cashflow** - where you enter all of your income and expenses, as well as how frequently they reoccur.

## Workflow

### 1. Get the template

To get started, open the [template](https://docs.google.com/spreadsheets/d/1dMgDxpUU7ZbepUQpN81akw8QCtIO0_wsFnjmB_RiEQM/edit?usp=sharing) and create a copy to your own Google Drive: File -> Make a copy.

### 2. Specify projection range and recurring cashflow

You want to start projecting by going to the *Projection* sheet and specifying the range of months for which you are going to do the projection:

![Specifying the projection range](/post_assets/2023-03-24-financial-projection/projection-range.gif)

Then go to the *Cashflow* tab and fill in your expenses and how frequently they occur. Here is how to add a new expense:

![Adding a new expense](/post_assets/2023-03-24-financial-projection/expenses.gif)

To delete an expense, select its row context menu the same way as on the gif above, and select "Delete row".

Every expense has the following values:

- **✨ Name** - the name of the expense
- **🎬 Start** - on which date it starts. This is the date when you pay first.
- **🏁 End** – on which date it ends. This is the date you pay for the last time. If it is blank, the cashflow never ends.
- **💸 Amount** – positive values for income, negative - for expenses.
- **⏳ Cycle**, months – how frequently does it repeat? A number, in months.
  - E.g. `1` means "once a month", `2` – "every 2 months".
  - `0` means "Never", use it to "disable" expenses.
  - Blank means one-time expense – occurs only on the date specified as Start. The end date is ignored.
- **💰 Total** – how much in total you will pay or receive of that cashflow over the projection range.

The *Cashflow* tab consists of two tables: the colored one to the left, and the uncolored one to the right. Only the colored table to the left is meant to be editable by the user.

You will see that the expenses are grouped by categories. This is not mandatory: you can remove categories if you like, or add new ones. Here's an example of how to remove a category and create it again:

![Working with Categories gif](/post_assets/2023-03-24-financial-projection/categories.gif)

### 3. Observe and Correct the Projection

![Model Overview](/post_assets/2023-03-24-financial-projection/model-overview.png)

Once you've specified all the recurring expenses and income in the *Cashflow* tab, go back to the *Projection* tab, where you will see the projection of your balance for any given month:

- **📆 Date** – the date for which the balance is projected.
- **💸 Cashflow** – your income minus your expenses for one month before and including the *Date* which is being projected. This means:
  - If the *Date* is `2023-02-01`, all the income and expenses between `2023-01-01` (exclusive) and `2023-02-01` (inclusive) will get added up.
  - If e.g. the Salary start date is `2023-01-01` and your projected date is `2023-01-01`, the Salary will be included in the calculation for that projection date. The rationale is that, since you get paid on that precise day, the balance will be impacted on that precise day by that cashflow.
- **📈 Projected Balance** – what your balance will be on a given *Date*. For the first date of your projection, feel free to change the calculated value to the balance with which you are starting on that date since the program has no way of knowing what that balance is. The *Projected Balance* for a given *Date* is computed as a *Projected Balance* for the previous *Date* (or the *Real Balance*, if it is defined) plus *Cashflow* for the current *Date*.
- **💰 Real Balance** – meant to be filled by the user, this is your way of telling the program what your balance really turned out to be on the given *Date*. If you fill it in, the program will use that value instead of the *Projected Balance* for that *Date* for all its calculations.
- **🪙 Difference** – *Real Balance* minus *Projected Blanace*, reflects by how much you overspent from your budget (if negative) or how much you saved (if positive). Provides a way of tracking the accuracy of your budget as specified in the *Cashflow* tab.
- **📝 Notes** – any notes you want to make for a given date. E.g. you can use this field to explain the *Difference* between the *Real Balance* and the *Projected Balance*.

Check back at this sheet every projection date, and enter the *Real Balance*. If some *Difference* manifested, reflect in *Notes* what happened, and correct the *Cashflow* sheet to match the reality.

## Relationship with other personal finance software

As mentioned before, there are three times in finance: the past, the present, and the future. Most of the personal finance software you can find online focuses on the past and the present. The financial projection proposed above focuses on the future.

Focusing on the future means it tries to be accurate in predicting the balance for the future and tries to make it easy to model different scenarios.

Focusing on the past and present means trying to make sense of where the money went.

For effective personal finance, you need to focus on all three. I'm using the financial projection described here in conjunction with YNAB to both stay on track and have a projection for the future.

Future-wise, YNAB is blind and its approach to finance is overengineered. But it provides a good expense categorization capability. Personally, I duplicate in YNAB all the categories I have in the spreadsheet. This way, if you have a difference between your projected and real balance, you have a way of looking at the past and answering what happened, so that you can predict the future more accurately next time.

## Multiple Bank Accounts, Credit Cards, Currencies

The solution doesn't track all of that. However, most people do have several accounts and credit cards, sometimes in different currencies.

A recommended approach in such a situation is to sum the money in all your bank accounts while converting them into one base currency. This way, you have one number to represent all your money.

The financial projection template does not track credit card debt. The projected balance is the sum balance on all your bank accounts, it is NOT your net worth. If you are planning to make some expense off a credit card, you can set its date in the *Cashflow* sheet to the date when you are planning to repay that expense. For example, if you buy your groceries off the credit card and repay it at the end of the month on a given day, you can set the "Groceries" expense's Start date to the date when you repay the credit card.

If you have a multi-bank environment with credit cards, you should consider using the financial projection sheet in conjunction with budgeting software such as YNAB as was discussed [above](#relationship-with-other-personal-finance-software).

## Advanced Technique: Scenario-based Planning

One advanced technique in personal financial projection involves e.g. scenario-based planning. This is when you have several models of the future and you want a financial projection for each. E.g. you're contemplating on going for a vacation to Italy, or to Thailand, or not going anywhere at all and working on a side project for the vacation time – which you expect to yield some returns in the future. Or not yield if it is not successful.

These are four different scenarios, each with different financial implications. The *Cashflow* sheet will be different for each.

With the presented financial projection template, it is not difficult to create a separate sheet for each such scenario's cashflow. Furthermore, it is possible to have one base *Cashflow* sheet that contains the expenses and incomes that are the same for all scenarios and treat each scenario sheet as a modifier to the base cashflow sheet. It is then possible to integrate those scenarios into the *Projection* sheet by making a drop-down menu to select which scenario you would like to view, and have the projections computed for that scenario.

If you would like to do scenario-based planning, you need an understanding of how exactly my template works under the hood. Those details are for another blog post, but here are some guidelines if you're eager to take a look yourself:

- The template uses only Google Sheets formulas. No macros, no scripts.
- The template uses the "Named Formulas" feature of Google Sheets to define several custom formulas.
- The main formulas to take a look at are:
  - `COL_SUM(cashflow_sheet_name, projected_date)` - used in the *Cashflow* column of the *Projection* sheet, this Named Formula takes a Cashflow sheet name and the date for which the projection is computed and computes the cashflow (income minus expenses) for that date. So, if you have several Cashflow sheets, you could merge them in the *Projection*'s *Cashflow* column by calling `COL_SUM` on all of them and adding the results: `COL_SUM("Cashflow 1", A2) + COL_SUM("Cashflow 2", A2)`.
  - `MONTH_INTERP_CONTAINS(start_date, end_date, step, current_date)` - Checks if an interpolation between two dates by a given step (in months) contains a given month. If the step is an empty string, assume the given date only happens once, on its start date. This Named Formula is used in the *Cashflow* sheet to determine, for each projected date, if a given cashflow should be included in the calculation.
  - [`MAKEARRAY`](https://support.google.com/docs/answer/12569202?hl=en) - a built-in Google Sheets [function](https://support.google.com/docs/answer/12569202?hl=en) that works a bit like a nested `for` loop in many programming languages. Its job is to populate a range of cells using a [lambda](https://support.google.com/docs/answer/12508718?hl=en). It is used together with the `MONTH_INTERP_CONTAINS` function in the *Cashflow* sheet to determine, for each projected date, which expenses occur for the month that precedes that date and which don't.

## Conclusion

The described template for financial projection should give you a tool to build awareness of your financial future given recurring expenses. It is flexible enough to support incomes and expenses that happen once every few months or are one-time expenses without any recurrence.

While great in projecting the future, it's important to remember that it can't be used as effectively to reflect on the past. To make sure your projections are accurate, you need to complement this template with software like YNAB that focuses on the analysis of the past.
