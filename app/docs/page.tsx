import { DocsFeatures } from '@/components/doc_featuers'
import { Youtube } from '@/components/youtube'
import { Bot } from 'lucide-react'
import React from 'react'

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen px-20 pt-10 gap-10">
        <h1 className="sm:text-4xl font-bold text-center mb-5 text-2xl text-muted-foreground">Documentation</h1>
        <section id='youtube' className='w-full px-28'>
          <Youtube/>

          <div className='pt-10'>
            <DocsFeatures/>
          </div>
        </section>
        <section id='readme' className='w-full px-14 py-10'>
        <div>

          {/* Title and Caption */}
        <h1 className='text-4xl pb-2 font-semibold'><Bot/>Biot</h1>
        <p className='text-muted-foreground pb-6'>
          The Valorant Team Builder AI Assistant is designed to help users create the best possible team for competing in international Valorant tournaments. By leveraging historical data and advanced LLM, this assistant provides reliable and strategic team formation suggestions.
        </p>

        {/* Key Features */}
        <h3 className='text-xl font-semibold' >Key Features</h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Role Specialization: Ensures balanced team compositions by considering player roles.</li>
              <li>• Performance Metrics: Query and evaluates players based on player scores, average KDA, average combat score, and other key metrics.</li>
              <li>• Customizable Team: Mix and match players across different tiers, for unlimited combination.</li>
              <li>• Visualization: Display results in a graphical illustration to enhance user engagement and understanding.</li>
              <li>• Adaptability: Offers suggestions that can adapt to different game scenarios and strategies.</li>
            </ul>
        </ul>

        {/* Dataset */}
        <h3 className='text-xl font-semibold' >Dataset</h3>
        <p className='text-muted-foreground pb-2'>3 years (2022, 2023, 2024) data from Valorant VCT competition (Source: VCT-Hackathon 2024 Dataset). After cleaning and processing, the players details include:</p>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Tier (International, Challengers, Game-Changers</li>
              <li>• Role (Duelist, Initiator, Controller, Sentinel)</li>
              <li>• Gender</li>
              <li>• Nationality</li>
              <li>• Average Combat Score (ACS)</li>
              <li>• Average Kill/Death Ratio (KDA)</li>
              <li>• Derived Player Score (ACS x KDA)</li>
              <li>• Agent Pool & Win Rate</li>
              <li>• Map Pool  & Win Rate</li>
            </ul>
        </ul>
        
        {/* System Architecture */}
        <h2 className='text-2xl pb-4 pt-2 font-semibold'>System Architecture</h2>
        <img
          src='/docs/workflow.png'
          alt='system-architecture'
          className='w-full p-10'
          />

        {/* AWS Services */}
        <h3 className='text-xl font-semibold' >AWS Services</h3>
        <ul className='text-muted-foreground'>
          <li>
          1) Amazon Bedrock Agent with AWS Lambda
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • The solution leverages Amazon Bedrock, an AI service, integrated with AWS Lambda to power the conversational agent. Lambda functions enable serverless execution of code in response to various events, which minimizes infrastructure management while scaling automatically based on demand. This combination allows for efficient deployment and management of conversational agents for real-time, event-driven tasks.</li>
            </ul>
          </li>
          <li>
          2) Amazon S3 for Knowledge Base & Amazon OpenSearch Service (AOSS) for Indexing and Retrieval-Augmented Generation (RAG)
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • The project uses Amazon S3 as a scalable storage solution for the knowledge base, ensuring high availability and durability for large datasets. In tandem, Amazon OpenSearch Service (AOSS) facilitates indexing and searching through this knowledge base. The RAG (Retrieval-Augmented Generation) approach improves the conversational agent’s ability to deliver accurate and contextually relevant responses by retrieving the most pertinent information from indexed data.</li>
            </ul>
          </li>
          <li>
          3) Amazon EC2 for Hosting API and LLM
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • Amazon EC2 instances are utilized to host the Python API responsible for managing calls to the Large Language Model (LLM). This setup provides full control over the compute environment, allowing customization, scalability, and optimization based on the processing requirements of the LLM. By running the API on EC2, the solution can handle high levels of traffic while maintaining performance and reliability.</li>
            </ul>
          </li>
          <li>
          4) Amazon Route 53 and Elastic Load Balancer for HTTPS Traffic Management
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • To ensure secure, highly available, and scalable web traffic management, the project employs Amazon Route 53 for DNS routing and Elastic Load Balancer (ELB) for distributing incoming HTTPS traffic across EC2 instances. This setup helps in maintaining a robust, secure infrastructure by evenly distributing traffic and enhancing fault tolerance while providing HTTPS encryption for secure communication between users and the server.
              </li>
            </ul>
          </li>
        </ul>

        {/* LLM */}
        <h3 className='text-xl font-semibold' >Claude 3 Haiku</h3>
        <p className='text-muted-foreground pb-2'>In selecting the AI model for our chatbot, we carefully evaluated several available options and ultimately chose Claude 3 Haiku due to its unique combination of features that align perfectly with our project’s needs.</p>
        <ul className='text-muted-foreground'>
          <li>
          1) Low Token Cost
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • One of the primary reasons we selected Claude 3 Haiku is its efficiency in terms of token usage. Claude 3 Haiku operates with lower token consumption compared to many other large language models, which helps reduce operational costs, especially in high-traffic environments. This efficiency makes it ideal for sustained, large-scale chatbot applications where minimizing token usage is crucial to maintaining cost-effectiveness.</li>
            </ul>
          </li>
          <li>
          2) Natural and Contextual Conversations
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • Claude 3 Haiku excels at generating natural, context-aware responses. This makes it particularly well-suited for chatbots, where providing fluid and relevant replies is essential for a high-quality user experience. Its ability to maintain the context of the conversation across multiple exchanges enhances the chatbot’s utility in a dynamic environment.</li>
            </ul>
          </li>
          <li>
          3) Scalability and Integration
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> • The model is highly scalable and integrates seamlessly with the existing AWS infrastructure we are using, including Bedrock and RAG for improved response quality. This makes Claude 3 Haiku a strategic choice that supports the broader system architecture efficiently, without requiring extensive custom integrations.
              </li>
            </ul>
          </li>
          <li>
            <ul className='text-muted-foreground pb-6 pl-2'>
              <li> By selecting Claude 3 Haiku, we ensure that our chatbot is both cost-efficient and capable of delivering high-quality, contextually accurate responses while maintaining flexibility and scalability for future growth.
              </li>
            </ul>
          </li>
        </ul>

        {/* Use Cases and Prompts */}
        <h3 className='text-xl font-semibold' >Use Cases and Examples Prompts</h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Professional Team: "Build a team using only players from VCT International. Assign roles to each player and explain why this composition would be effective in a competitive match."</li>
              <li>• Cross-Regional Team: "Build a team with players from at least three different regions. Assign each player a role and explain the benefits of this diverse composition."</li>
              <li>• Performance Analysis: "How is the latest performance of SEN TenZ."</li>
              <li>• Customize Team: “Please replace SEN TenZ with another duelist."</li>
            </ul>
        </ul>

        {/* Error handling */}
        <h3 className='text-xl font-semibold' >Error Handling and System Reliability</h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Robust error-handling mechanisms are in place to ensure system reliability.</li>
              <li>• Implemented multiple pre-commands for the LLM-models, ensuring the AI agent's scope stays within Valorant Team Formation.</li>
              <li>• BIOT is designed to handle data inconsistencies and provide accurate suggestions even in the presence of incomplete or noisy data.</li>
            </ul>
        </ul>

        {/* Key Challenges */}
        <h3 className='text-xl font-semibold' >Key Challenges and Solutions</h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Data Processing and Integration: Ensuring that all important data are correctly read and integrated is crucial. Implementing more robust data validation and integration processes to handle multiple files accurately."</li>
              <li>• Model Limitation: Addressing the limitations of the RAG model in handling large datasets or multiple files. This might involve optimizing the model or exploring alternative models that can better manage complex data inputs.</li>
            </ul>
        </ul>

        {/* Future Direction */}
        <h3 className='text-xl font-semibold' >Future Directions </h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>• Enhance BIOT's accuracy with more variables and a broader range of player statistics.</li>
              <li>• Add Versus Mode, which will predict the win rate of both teams when they compete based on historical data.</li>
            </ul>
        </ul>

        {/* Conclusion */}
        <h3 className='text-xl font-semibold' >Conclusion </h3>
        <ul className='text-muted-foreground'>
            <ul className='text-muted-foreground pb-6'>
              <li>We would like to extend our heartfelt thanks to Devpost, Riot Games, and AWS for organizing this hackathon. It has been an incredible experience, and we are truly grateful for the opportunity to participate in such an exciting and innovative competition.</li>
              <br/>
              <li>This was our team’s first time working extensively with AWS services, and we were thoroughly impressed by the range of tools and the seamless integration between different services. From Amazon Bedrock to EC2 and Route 53, AWS provided the robust and scalable infrastructure that was crucial for building our chatbot. We’ve gained invaluable hands-on experience and are excited to continue exploring AWS for future projects.</li>
              <br/>
              <li>Once again, thank you to everyone involved in making this hackathon a success, and we look forward to utilizing the skills and knowledge we’ve gained to push the boundaries of what’s possible in esports and AI.</li>
            </ul>
        </ul>
      </div>
      </section>
    </div>

  )
}
