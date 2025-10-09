---
title: "Techniques to gain basic insights into ML Models"
description: "A collection of techniques to gain basic insights into ML Models from Kaggle courses"
layout: post
---

I recently went through two remarkable tutorials on Kaggle: [Feature Engineering](https://www.kaggle.com/learn/feature-engineering) and [Model Explainability](https://www.kaggle.com/learn/machine-learning-explainability). They presented a bunch of different techniques to understand your data and models, which I'm going to summarise and connect in this article.

<!-- more -->

The objective of a data scientist is ultimately to create a model that accurately describes reality. They might ask questions about three things to do it effectively:

- **Feature-Target Interaction**: What features in my data have predictive power over the target variable?
- **Feature-Feature Intearction**: How do features interact with each other? How are they related? How is the data set organized? The answers to those are important since feature interactions can be leveraged to create new features that your model will be more suited to learn. Also, understanding feature-feature interaction leads to a better understanding of your data, which is helpful when modelling it.
- **Prediction Decomposition**: Given a data point, why did the model predict one target variable's value for it and not another? What features made it predict that way? What was the contribution of each feature? Answering those questions is useful for debugging, but also to understand how exactly the model uses the features.

The Kaggle tutorials I mentioned provide a set of techniques to answer questions from those three categories:

- **Feature-Target Interaction**
  - **Mutual Information (MI)** - model-agnostic metric calculated for each feature that describes how much information we gain about the target from that feature.
  - **Permutation Importance (PI)** - a model-dependent metric calculated for each feature that describes how much in general the model relies on the feature to make its predictions.
- **Feature-Feature Interaction**
  - **Principal Component Analysis (PCA)** - a model-agnostic technique that provides an insight into which features correlate between each other and which - do not.
  - **K-Means Clustering** - a model-agnostic technique that can be used to partition data into clusters.
- **Prediction Decomposition**
  - **Partial Dependence Plot** - a model-dependent technique that constructs a plot of how much a marginal change in a feature affects predictions.
  - **SHAP** - a model-dependent technique that, for each prediction of a model, provides a decomposition of how much each feature contributed to that prediction, so, that the feature scores sum up to the deviation of the prediction from an expected baseline.

## Mutual Information (MI)

This is a score computed for a feature with respect to a target variable which indicates how much information the feature carries about the target.

The MI score is based on the notion of entropy from information theory. Entropy is computed for a given signal and means an average file size required to express any possible value of that signal. E.g. when people say in cryptography, 128 bits of entropy key, it means a key that needs 128 bits to be expressed. Another example is movies: if on average a movie is 4GB, we can say the entropy of all possible movies is 4GB. Note: the "average" in question is in fact a weighted average: weighted by the probability of encountering a given movie when drawing at random from the dataset.

Information is stored in bits, and entropy is the average length of the bit string for a given signal, weighted by the probability of each possible message.

Expressing information in bits is closely connected to decision trees. A bit string 010 can be represented as a path through a binary decision tree, the first node of which decides on what the first bit would be - 1 or 0 - the second level - on what the second bit would be, and so on. Each link going from a node of the decision tree to its children would represent picking either 0 or 1. And, after the 3rd choice, we will arrive at a leaf of that tree that represents the bit string we were trying to encode.

So, if bit 0 means choosing the left link on a given tree node, and 1 - means choosing the right link - the bit string 010 would be represented by a path through the decision tree: left-right-left.

An entropy, then, becomes an average path through a decision tree used to code the information in question, weighted by the probability of that path being taken. The probability nuance is important, since, e.g., if we know that a certain message is encountered more frequently in the signal, we can construct the tree so that it corresponds to a smaller path, thus saving on space most of the time (at the expense of requiring a longer path to represent less-frequent messages). You can read more about this technique, e.g., on Wiki about the [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding).

Now, why is entropy important for Machine Learning? Well, decision trees also happen to be a powerful ML algorithm. The leaves of the decision tree are the possible states of the target variable, and the nodes - questions about the features. The deeper the tree - the more questions it needs to ask about the data to predict a variable, and it is not desirable to ask too many questions because of the danger of overfitting.

Now, the MI score of a feature is calculated as an entropy of the target variable without the knowledge of the feature minus the entropy of the target variable when we know the feature. Recall that entropy is an average path through a decision tree. So, a reduction in entropy means we can get away with a shallower decision tree, which means less chance to overfit while still having precise predictions.

MI score can be used for feature selection, to see which feature is likely important and needs further investigation.

## Permutation Importance (PI)

Permutation Importance is similar to the MI score in the sense that it tries to answer the question of what features provide information about the data. The PI score is calculated for a feature against a trained model. It measures how much on average the model's predictions become off if we randomly shuffle the given feature column.

It is common sense that we'd expect a high-MI feature to also have a high PI score: if MI is essentially a measure of the information content of the feature about the target variable, we'd like our model to be able to extract that information content. If that doesn't happen, we need to investigate why:

- Redundancy is one possible cause: a model can get the same information from another feature and ignore this one.
- Unsuitable model: maybe the model is not a good choice for this feature and is unable to learn its relationship to the target variable effectively.

A high-PI feature isn't guaranteed to be also a high-MI. For example, on its own, a feature might not be very informative at all about the target variable. But, in an interaction with another feature, it becomes very informative, and the model is able to learn this interaction.

## Principal Component Analysis (PCA)

PCA is a technique that can tell you which features correlated with each other and how strongly.

A tabular dataset can be viewed as a set of points in a high-dimensional space, where each point represents an entry of the dataset. The coordinates of each point are its features in the dataset. Therefore, the feature columns in the dataset become axes of the high-dimensional space.

A PCA finds a better set of axes in the same space, and each axis tries to be aligned with the strongest correlation possible amongst points. The intuition for the algorithm is as follows:

1. Create a new axis, and rotate it around until the projections of all the points on that axis will be as far separated from each other as possible.
2. Create another axis, orthogonal to axis (1). Repeat what we did for the axis (1) for it. Note that, since this axis must be orthogonal to (1), it won't be as successful in capturing most variability as (1) was.
3. Repeat steps (1)-(2) as many times as there are features in the dataset to guarantee you don't lose information.

Note that this is just an intuition for the technique. The real implementation doesn't use loops or brute-forcing an ideal axis alignment: it uses some clever linear algebra equations to achieve the same result.

PCA expresses these new axes (components) in terms of the original features. For each feature, a loading is computed that determines how much that feature contributes to the new component.

- Within one component, two features with high loadings of the same sign are correlated.
- Two features within the same component with opposite signs are inversely correlated.
- Two features with high loadings in two different components are not correlated with each other.

PCA is good to use to discover how features are correlated within the dataset. Sometimes, PCA components make good features themselves, and sometimes, the information about the correlation of the features can guide us to engineer new, better features that our model couldn't otherwise learn. When engineering new features, it is important to take into account the capabilities of your model: one and the same engineered feature might make a lot of sense for one model but is not useful for another model.

Another good reason to explore your dataset with PCA is to gain insight into the data. Often components have a meaning behind them. E.g., in the Kaggle tutorial they had an example of the diameter of a sea creature being correlated with its height - thus PCA will learn it as a separate component since PCA learns correlations. Diameter and height together can be interpreted as size, giving this component a meaningful name and interpretation. So insights about the data and the domain can be gained by exploring the PCA components.

And yet another use of PCA is performance and data visualization. PCA learns axes that combine features from high levels of correlations to low levels. If you drop a bunch of PCA components with lower levels of correlation, the relative position of your data points in the high-dimensional space won't change much. So, PCA can be used to go from a higher-dimensional space to a lower-dimensional one. This is good for visualization and also for performance - less computational power is needed to work with lower-dimensional data points.

## K-Means Clustering

Clustering is another technique to draw insight into how data points are organized in the high-dimensional space of the dataset. If PCA was dealing with correlation, Clustering is dealing with proximity: which data points tend to stick together?

Clustering doesn't make sense for every dataset but is a useful tool to have when it does.

Partial Dependence Plot

PDP is a technique to measure how changes in a feature impact predictions of the model.

It is calculated as follows:

1. Isolate several values for the target feature that you'd like to compare.
2. For each such value, substitute that value for every entry of the dataset, leaving all the other values unchanged.
3. Compute predictions with your model, and average them out.

PDP is a plot of average predicted values on the Y axis against the feature value on the X axis.

PDP can be useful to explore how exactly a variation of the feature impacts the prediction. It is, however, to be used with caution: if the feature in question has complex interactions and correlations with other features, the PDP might not reflect reality - because in reality, you can't change that feature independently from others.

## SHAP

SHapely Additive Explanations is a technique to visualize and get intuition on each individual feature's contribution towards a prediction for a given data entry.

SHAP can be used to explain why a model predicted one result and not another. Also, SHAP can be used to visualize a distribution of influences on predictions for a given feature.

This distribution of influences is particularly important because it can be a good indicator of feature interactions. If one and the same feature value in some cases contributes to a given prediction and in others - against it - it is a good sign that it interacts with some other feature.

## Conclusion

Overall, the six techniques given in the Kaggle courses on Feature Engineering and Model Explainability give a toolset to answer questions on feature-target, feature-feature interactions, data organization in the dataset, and to get an insight into how a given model makes predictions. This information can be useful to better understand the data, the domain, and the model at hand, which, in turn, is good for debugging, feature- and model-engineering purposes.
