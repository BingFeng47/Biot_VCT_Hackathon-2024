# ✨ Biot

WebApp: [Biot: AI Valorant Esports Team Manager](https://biot.vercel.app)\
Youtube: [Watch Our Demo Here!](https://youtu.be/2mgYJSymY9M)

The Valorant Team Builder AI Assistant is designed to help users create the best possible team for competing in international Valorant tournaments. By leveraging historical data and advanced LLM, this assistant provides reliable and strategic team formation suggestions.

---

### 🙊 Important Note on AWS Bedrock Throttling Issue

> Due to current **AWS Bedrock throttling limitations**, the BIOT Bot return error messages in the chat. If you encounter any issues with the bot not functioning as expected, please try again after a short wait.\
> \
> Since player suggestions by the BIOT Bot are displayed visually only when the bot is functioning, we've added a **Demo** button to simulate this feature. If you experience issues due to throttling, feel free to use the Demo mode to see how team suggestions and team analyzer work.

## 🚀 BIOT V2 Updates

In BIOT V2, we're introducing a **Team Analyzer** that brings more flexibility and insight into building your dream team. Here’s what’s new:

- **Enhanced Bot Responses**: The BIOT Bot now provides more detailed and context-aware answers, helping you strategize even more effectively
- **Build Your Own Team**: Add or drop players easily to customize and assemble your ideal team lineup.
- **One-Click Team Analysis**: Instantly analyze your selected team with a single click, providing comprehensive stats including:
- **Overall Combat Score**: Get a summary of your team's combat effectiveness.
- **Best Maps**: View team performance across different maps to strategize optimal map choices.
- **Dynamic Visual Charts**: The analysis includes beautiful, easy-to-understand visual charts that make stats clearer, helping you make more informed decisions quickly.

These enhancements make BIOT V2 a more powerful and dynamic tool for strategizing and building top-tier teams!

## 🔑 Key Features

- Role Specialization: Ensures balanced team compositions by considering player roles.
- Performance Metrics: Query and evaluates players based on player scores, average KDA, average combat score, and other key metrics.
- Customizable Team: Mix and match players across different tiers, for unlimited combination.
- Visualization: Display results in a graphical illustration to enhance user engagement and understanding.
- Adaptability: Offers suggestions that can adapt to different game scenarios and strategies.
  Data Models and Visualization

## 📒 Dataset

3 years (2022, 2023, 2024) data from Valorant VCT competition (Source: VCT-Hackathon 2024 Dataset). After cleaning and processing, the players details include:

- Tier
- Role (Duelist, Initiator, Controller, Sentinel)
- Gender
- Nationality
- Average Combat Score (ACS)
- Average Kill/Death Ratio (KDA)
- Derived Player Score (ACS x KDA)
- Match Win Rate
- Agent Pool & Win Rate
- Map Pool & Win Rate

## ⚙️ System Architecture

<img width="1169" alt="workflow" src="https://github.com/user-attachments/assets/2f68d4ff-857e-48bc-a62d-4813429595da">

### AWS Services

1. Amazon Bedrock Agent with AWS Lambda

- The solution leverages Amazon Bedrock, an AI service, integrated with AWS Lambda to power the conversational agent. Lambda functions enable serverless execution of code in response to various events, which minimizes infrastructure management while scaling automatically based on demand. This combination allows for efficient deployment and management of conversational agents for real-time, event-driven tasks.

2. Amazon S3 for Knowledge Base & Amazon OpenSearch Service (AOSS) for Indexing and Retrieval-Augmented Generation (RAG)

- The project uses Amazon S3 as a scalable storage solution for the knowledge base, ensuring high availability and durability for large datasets. In tandem, Amazon OpenSearch Service (AOSS) facilitates indexing and searching through this knowledge base. The RAG (Retrieval-Augmented Generation) approach improves the conversational agent’s ability to deliver accurate and contextually relevant responses by retrieving the most pertinent information from indexed data.

3. Amazon EC2 for Hosting API and LLM

- Amazon EC2 instances are utilized to host the Python API responsible for managing calls to the Large Language Model (LLM). This setup provides full control over the compute environment, allowing customization, scalability, and optimization based on the processing requirements of the LLM. By running the API on EC2, the solution can handle high levels of traffic while maintaining performance and reliability.

4. Amazon Route 53 and Elastic Load Balancer for HTTPS Traffic Management

- To ensure secure, highly available, and scalable web traffic management, the project employs Amazon Route 53 for DNS routing and Elastic Load Balancer (ELB) for distributing incoming HTTPS traffic across EC2 instances. This setup helps in maintaining a robust, secure infrastructure by evenly distributing traffic and enhancing fault tolerance while providing HTTPS encryption for secure communication between users and the server.

### Claude 3 Haiku

In selecting the AI model for our chatbot, we carefully evaluated several available options and ultimately chose Claude 3 Haiku due to its unique combination of features that align perfectly with our project’s needs.

1. Low Token Cost

- One of the primary reasons we selected Claude 3 Haiku is its efficiency in terms of token usage. Claude 3 Haiku operates with lower token consumption compared to many other large language models, which helps reduce operational costs, especially in high-traffic environments. This efficiency makes it ideal for sustained, large-scale chatbot applications where minimizing token usage is crucial to maintaining cost-effectiveness.

2. Natural and Contextual Conversations

- Claude 3 Haiku excels at generating natural, context-aware responses. This makes it particularly well-suited for chatbots, where providing fluid and relevant replies is essential for a high-quality user experience. Its ability to maintain the context of the conversation across multiple exchanges enhances the chatbot’s utility in a dynamic environment.

3. Scalability and Integration

- The model is highly scalable and integrates seamlessly with the existing AWS infrastructure we are using, including Bedrock and RAG for improved response quality. This makes Claude 3 Haiku a strategic choice that supports the broader system architecture efficiently, without requiring extensive custom integrations.

By selecting Claude 3 Haiku, we ensure that our chatbot is both cost-efficient and capable of delivering high-quality, contextually accurate responses while maintaining flexibility and scalability for future growth.

## 🙅🏼 Error Handling and System Reliability

- Robust error-handling mechanisms are in place to ensure system reliability.
- Implemented multiple pre-commands for the LLM-models, ensuring the AI agent's scope stays within Valorant Team Formation.
- BIOT is designed to handle data inconsistencies and provide accurate suggestions even in the presence of incomplete or noisy data.

## 🙌🏼 Use Cases and Examples Prompts

1. Professional Team: "Build a team using only players from VCT International. Assign roles to each player and explain why this composition would be effective in a competitive match."
2. Cross-Regional Team: "Build a team with players from at least three different regions. Assign each player a role and explain the benefits of this diverse composition."
3. Performance Analysis: “How is the latest performance of SEN TenZ”.
4. Customize Team: “Please replace SEN TenZ with another duelist”.

## 🤔 Key Challenges and Solutions

- Data Processing and Integration: Ensuring that all important data are correctly read and integrated is crucial. Implementing more robust data validation and integration processes to handle multiple files accurately.
- Model Limitation: Addressing the limitations of the RAG model in handling large datasets or multiple files. This might involve optimizing the model or exploring alternative models that can better manage complex data inputs.

## 💭 Future Directions

- Enhance BIOT's accuracy with more variables and a broader range of player statistics.
- Add Versus Mode, which will predict the win rate of both teams when they compete based on historical data.

## 🎉 Conclusion

We would like to extend our heartfelt thanks to Devpost, Riot Games, and AWS for organizing this hackathon. It has been an incredible experience, and we are truly grateful for the opportunity to participate in such an exciting and innovative competition.

This was our team’s first time working extensively with AWS services, and we were thoroughly impressed by the range of tools and the seamless integration between different services. From Amazon Bedrock to EC2 and Route 53, AWS provided the robust and scalable infrastructure that was crucial for building our chatbot. We’ve gained invaluable hands-on experience and are excited to continue exploring AWS for future projects.

Once again, thank you to everyone involved in making this hackathon a success, and we look forward to utilizing the skills and knowledge we’ve gained to push the boundaries of what’s possible in esports and AI.
